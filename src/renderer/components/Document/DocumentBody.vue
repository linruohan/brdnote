<template>
  <div class="document-container" ref="document-body" id="document-body">
    <div class="document-body">
      <document-title></document-title>
      <tag-bar-plane></tag-bar-plane>
      <div class="content-container">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getSize } from '@/uitls/miscellaneous'
import DocumentTitle from '@/components/Document/DocumentTitle'
import TagBarPlane from '@/components/TagBar/TagBarPlane'

export default {
  name: 'DocumentBody',
  components: {
    'document-title': DocumentTitle,
    'tag-bar-plane': TagBarPlane
  },
  methods: {
    setDocumentPosition () {
      setTimeout(() => {
        var documentBody = document.getElementById('document-body')
        var toolbar = document.getElementById('toolbar-plane')
        if (documentBody && toolbar) {
          documentBody.style.height = getSize().height - 25 - toolbar.clientHeight + 'px'
        }
      }, 1)
    }
  },
  mounted () {
    this.setDocumentPosition()
    window.addEventListener('resize', () => {
      this.setDocumentPosition()
    }, true)
  }
}
</script>

<style scoped>
.document-container {
  overflow-x: hidden;
  padding: 100px 20px 200px;
}

.document-body {
  max-width: 900px;
  min-height: 200px;
  margin: 10px auto;
  padding: 15px 0px 50px;
  border-radius: 10px;
}

.content-container {
  margin: 25px 0px;
  outline: none;
}
</style>
