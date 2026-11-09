document.querySelectorAll('[data-research-browser]').forEach((browser) => {
  const areaOptions = [...browser.querySelectorAll('[data-topic]')];
  const categoryNavs = [...browser.querySelectorAll('.research-category-options')];
  const categoryOptions = [...browser.querySelectorAll('[data-category]')];
  const papers = [...browser.querySelectorAll('.pub')];
  const yearHeadings = [...browser.querySelectorAll('[data-pub-year]')];
  const summary = browser.querySelector('[data-topic-summary]');
  // category id -> its area id, for /#research-<category> links
  const areaOfCategory = new Map(
    categoryOptions.filter((option) => option.dataset.category)
      .map((option) => [option.dataset.category, option.dataset.area]),
  );

  const setCurrent = (option, isCurrent) => {
    if (isCurrent) option.setAttribute('aria-current', 'true');
    else option.removeAttribute('aria-current');
  };

  // Show one area (or "all"), optionally narrowed to one of its categories.
  function select(areaId, categoryId = '') {
    const area = areaOptions.find((option) => option.dataset.topic === areaId);
    if (!area) return;

    areaOptions.forEach((option) => setCurrent(option, option === area));
    categoryNavs.forEach((nav) => { nav.hidden = nav.dataset.area !== areaId; });
    categoryOptions.forEach((option) => setCurrent(
      option, option.dataset.area === areaId && option.dataset.category === categoryId,
    ));

    // Papers stay in year order (newest first) in every view; the year
    // headings only appear in "All".
    papers.forEach((paper) => {
      if (areaId === 'all') paper.hidden = false;
      else if (categoryId) paper.hidden = paper.dataset.researchCategory !== categoryId;
      else paper.hidden = paper.dataset.researchTopic !== areaId;
    });
    yearHeadings.forEach((heading) => { heading.hidden = areaId !== 'all'; });
    summary.textContent = area.dataset.description;
  }

  function selectFromLocation() {
    const hash = location.hash;
    if (hash.startsWith('#research-')) {
      const id = hash.slice(10);
      if (areaOfCategory.has(id)) select(areaOfCategory.get(id), id);
      else select(id);
      return;
    }
    select('all');
    // Venues in the research map link to #pub-<id>. Showing all papers makes
    // the target visible again, so scroll to it once the list is back.
    if (hash.startsWith('#pub-')) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target && browser.contains(target)) target.scrollIntoView();
    }
  }

  const handleClick = (areaId, categoryId) => (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(areaId, categoryId);
    history.pushState(null, '', '#research-' + (categoryId || areaId));
  };
  areaOptions.forEach((option) => {
    option.addEventListener('click', handleClick(option.dataset.topic, ''));
  });
  categoryOptions.forEach((option) => {
    option.addEventListener('click', handleClick(option.dataset.area, option.dataset.category));
  });
  window.addEventListener('popstate', selectFromLocation);
  window.addEventListener('hashchange', selectFromLocation);
  selectFromLocation();

  // Opening a /#pub-<id> link directly: thumbnails above the target can still
  // be loading and push it down, so re-align once everything has loaded,
  // unless the visitor has scrolled in the meantime.
  if (location.hash.startsWith('#pub-')) {
    const initialScroll = window.scrollY;
    window.addEventListener('load', () => {
      if (Math.abs(window.scrollY - initialScroll) < 2) selectFromLocation();
    }, { once: true });
  }
});
