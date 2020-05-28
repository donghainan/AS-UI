import FileHandle from './src/main.vue'

FileHandle.install = (vue) => {
  vue.component(FileHandle.name, FileHandle)
}

export default FileHandle
