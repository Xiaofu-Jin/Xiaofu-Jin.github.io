---
layout: post
title: Publications
excerpt_separator:  <!--more-->
---
{% assign all_topic = site.data.research_topics | where: 'id', 'all' | first %}
<section id="research" data-research-browser>
  {% include research-topic-options.html %}
  <p class="research-topic-summary" data-topic-summary aria-live="polite">{{ all_topic.description }}</p>
  {% include publication-list.html %}
</section>
<script src="{{ '/assets/js/research-topics.js' | relative_url }}" defer></script>
