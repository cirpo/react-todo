let todoBrowserApi = {
  subscribe (onChange) {
    this.onChange = onChange
  },
  unsubscribe () {
    this.onChange = null
  },
  add (todo) {
    this.onChange && this.onChange(todo)
  }
}

export default todoBrowserApi
