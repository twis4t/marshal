import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#c0c2c7',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

export default function StyledDropzone(props) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      //console.log(props)
      props.onDrop(acceptedFiles)
    },
  })

  const files = acceptedFiles.map(file => {
    return <li key={file.path}>{file.path}</li>
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  )

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Перетащите сюда изображение или кликните для выбора файла</p>
      </div>
      {files}
    </div>
  )
}

StyledDropzone.propTypes = {
  onDrop: PropTypes.func,
}
