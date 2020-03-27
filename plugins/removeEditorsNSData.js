import { editorNamespaces as __editorNamespaces } from './_collections'
let editorNamespaces = __editorNamespaces

const name = 'removeEditorsNSData'

const type = 'perItem'

const active = true

const description = 'removes editors namespaces, elements and attributes'

const prefixes = []

const params = {
  additionalNamespaces: []
}

/**
 * Remove editors namespaces, elements and attributes.
 *
 * @example
 * <svg xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
 * <sodipodi:namedview/>
 * <path sodipodi:nodetypes="cccc"/>
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item, params) {
  if (Array.isArray(params.additionalNamespaces)) {
    editorNamespaces = editorNamespaces.concat(params.additionalNamespaces)
  }

  if (item.elem) {
    if (item.isElem('svg')) {
      item.eachAttr(function (attr) {
        if (attr.prefix === 'xmlns' && editorNamespaces.indexOf(attr.value) > -1) {
          prefixes.push(attr.local)

          // <svg xmlns:sodipodi="">
          item.removeAttr(attr.name)
        }
      })
    }

    // <* sodipodi:*="">
    item.eachAttr(function (attr) {
      if (prefixes.indexOf(attr.prefix) > -1) {
        item.removeAttr(attr.name)
      }
    })

    // <sodipodi:*>
    if (prefixes.indexOf(item.prefix) > -1) {
      return false
    }
  }
}

export { name, type, active, description, params, fn }
