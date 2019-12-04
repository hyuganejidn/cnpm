import React from 'react'
// import { list } from 'postcss';
// import { listImages, createImages, deleteImages } from '../services/image-service';
import '../styles/ImagesFood.css'
// import { IoIosCloseCircleOutline } from "react-icons/io";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
// import { deleteImage } from '../services/image-service'
// import { config } from '../config'


export default function Images(props) {
  const maxSize = 1024 * 1024 * 5
  const styleImages = {
    dropzone: 'add-images',
    dropzoneActive: 'add-images-active',
    preview: 'preview',
    previewImage: 'previewImage',
    submitButton: 'submitButton',
    submitButtonContainer: 'submitButtonContainer',
    dropzoneDisabled: 'dropzoneDisabled',
    inputLabel: 'btn btn-outline-primary btn-mg-l btn-pd',
    inputLabelWithFiles: 'btn btn-outline-info waves-effect btn-pd btn-font'
  }
  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => {
    const body = new FormData()
    body.append('file', file)
    // const token = localStorage.getItem('token')
    // const headers = {}
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`
    // }
    // return { url: `${config.url}/api/images`, body, headers }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    if (status === 'done' && xhr && xhr.response && xhr.status === 201) {
      meta.id = JSON.parse(xhr.response).id
      // props.onAdded(meta.id, file)
    }

    if (status === 'removed') {
      if (props.removeImageRemote) {
        // deleteImage(meta.id)
      }
      // props.onRemoved(meta.id)
    }
  }
  // receives array of files that are done uploading when submit button is clicked

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      // SubmitButtonComponent={true}
      inputContent="Chọn hình ảnh"
      inputWithFilesContent="Thêm hình ảnh"
      maxSizeBytes={maxSize}
      // onSubmit={props.onSubmit}
      classNames={styleImages}
      accept="image/*"
    />
  )
}
