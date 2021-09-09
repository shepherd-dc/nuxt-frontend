import { checkToken } from '@/utils/auth'

export default {
  provide () {
    return {
      tokenInfo: this.tokenInfo
    }
  },
  data () {
    return {
      valid: false,
      tokenInfo: {
        valid: false
      }
    }
  },
  async mounted () {
    const res = await checkToken(this)
    if (res.valid) {
      this.tokenInfo.valid = true
      this.valid = true
    }
  }
}
