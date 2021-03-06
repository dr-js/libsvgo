const name = 'removeXMLProcInst'

const type = 'perItem'

const active = true

const description = 'removes XML processing instructions'

const params = {}

/**
 * Remove XML Processing Instruction.
 *
 * @example
 * <?xml version="1.0" encoding="utf-8"?>
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
const fn = function (item) {
  return !(item.processinginstruction && item.processinginstruction.name === 'xml')
}

export { name, type, active, description, params, fn }
