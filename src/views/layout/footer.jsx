import '../../styles/footer.styl'
export default {
  data () {
    return {
      author: 'bang'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
