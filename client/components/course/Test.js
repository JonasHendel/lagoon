import FileViewer from 'react-file-viewer';
const FileViewer = () => {
  const file = 'https://lagoon.fra1.digitaloceanspaces.com/astonmartin.jpg'
  const type = 'jpg'
  return (
    <div>
        <FileViewer
        fileType={type}
        filePath={file}/>
    </div>
  )
}

export default FileViewer