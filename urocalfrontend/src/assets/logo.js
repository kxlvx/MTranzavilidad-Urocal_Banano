// Logo en base64 para reportes
const logo =
  "data:image/jpeg;base64,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";

export default logo;