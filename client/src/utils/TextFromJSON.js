import DOMPurify from 'dompurify'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';

const validateContent = (content) => {
    // Проверяем базовую структуру
    if (!content || content?.type !== 'doc' || !Array.isArray(content?.content)) {
      console.error('Invalid content format:', content)
      return { type: 'doc', content: [] }
    }
    
    // Фильтруем некорректные узлы
    const filteredContent = content.content.filter(node => {
      if (!node.type) {
        console.warn('Node without type:', node)
        return false
      }
      return true
    })
    
    return { ...content, content: filteredContent }
  }
  
  export const generateSafeHTML = (content) => {
    try {
      return generateHTML(validateContent(content), [
        StarterKit,
        TextAlign.configure({ 
          types: ['paragraph', 'heading'],
        })
      ])
    } catch (error) {
      console.error('HTML generation error:', error)
      return '<p>Error loading content</p>'
    }
  }