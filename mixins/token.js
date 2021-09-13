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
  methods: {
    async checkToken (cb) {
      const res = await checkToken(this)
      if (res.valid) {
        this.tokenInfo.valid = true
        this.valid = true
        if (cb) { cb() }
        return true
      }
      return false
    }
  }
}
