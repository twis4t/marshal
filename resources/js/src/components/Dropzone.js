import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const baseStyle = {
  flex: 1,
  textAlign: 'center',
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

const btnWrap = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
}

export default function StyledDropzone(props) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    accept: 'image/*',
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

  const uploadBanners = () => {
    let formData = new FormData()
    formData.append('banner', acceptedFiles[0])
    props.onSubmit(formData)
  }

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Перетащите сюда изображение или кликните для выбора файла</p>
      </div>
      {files}
      <div style={btnWrap}>
        <Button variant="outlined" color="primary" disabled={!files.length} onClick={uploadBanners}>
          Загрузить
        </Button>
      </div>
    </div>
  )
}

StyledDropzone.propTypes = {
  onSubmit: PropTypes.func,
}
