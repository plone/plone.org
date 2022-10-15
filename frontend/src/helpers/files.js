export const FILE_FORMATS = {
  'text/rtf': { icon: { lib: 'fal', name: 'file-alt' }, format_name: 'rtf' },
  'application/pdf': {
    icon: { lib: 'fal', name: 'file-pdf' },
    format_name: 'pdf',
  },
  'application/zip': {
    icon: { lib: 'fal', name: 'file-archive' },
    format_name: 'zip',
  },
  'application/x-zip-compressed': {
    icon: { lib: 'fal', name: 'file-archive' },
    format_name: 'zip',
  },
  'application/gzip': {
    icon: { lib: 'fal', name: 'file-archive' },
    format_name: 'gzip',
  },
  'application/vnd.rar': {
    icon: { lib: 'fal', name: 'file-archive' },
    format_name: 'rar',
  },
  'application/x-tar': {
    icon: { lib: 'fal', name: 'file-archive' },
    format_name: 'tar',
  },
  'application/json': {
    icon: { lib: 'fal', name: 'code' },
    format_name: 'json',
  },
  'text/javascript': {
    icon: { lib: 'fal', name: 'code' },
    format_name: 'js',
  },
  'text/html': { icon: { lib: 'fal', name: 'code' }, format_name: 'html' },
  'image/jpg': {
    icon: { lib: 'fal', name: 'file-image' },
    format_name: 'jpg',
  },
  'image/jpeg': {
    icon: { lib: 'fal', name: 'file-image' },
    format_name: 'jpeg',
  },
  'image/png': {
    icon: { lib: 'fal', name: 'file-image' },
    format_name: 'png',
  },
  'image/svg': {
    icon: { lib: 'fal', name: 'file-image' },
    format_name: 'svg',
  },
  'application/msword': {
    icon: { lib: 'fal', name: 'file-word' },
    format_name: 'Word',
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    icon: { lib: 'fal', name: 'file-word' },
    format_name: 'Word',
  },
  'application/vnd.ms-excel': {
    icon: { lib: 'fal', name: 'file-excel' },
    format_name: 'Excel',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    icon: { lib: 'fal', name: 'file-excel' },
    format_name: 'Excel',
  },
  'application/vnd.ms-powerpoint': {
    icon: { lib: 'far', name: 'file-ppt' },
    format_name: 'PowerPoint',
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    icon: { lib: 'far', name: 'file-ppt' },
    format_name: 'PowerPoint',
  },
  'text/xml': {
    icon: { lib: 'fal', name: 'file' },
    format_name: 'XML',
  },
  'application/xml': {
    icon: { lib: 'fal', name: 'file' },
    format_name: 'XML',
  },
  'text/plain': {
    icon: { lib: 'fal', name: 'file-alt' },
    format_name: 'TXT',
  },
};

export const getFileViewFormat = (file) => {
  const typeOfContent = file['mime_type'];

  const viewFormat = {
    icon: null,
    label: null,
  };
  if (FILE_FORMATS[typeOfContent]) {
    viewFormat.icon = FILE_FORMATS[typeOfContent]?.icon;
    viewFormat.label = FILE_FORMATS[typeOfContent].format_name;
  }
  return viewFormat;
};
