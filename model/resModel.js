class BaseModel {
  constructor(data, meessage) {
    if( typeof data == "string") {
      this.meessage = data
      data = null 
      meessage = null
    }
    if( data) {
      this.data = data
    }
    if(meessage) {
      this.meessage = meessage
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, meessage) {
    // 继承
    super(data, meessage)
    this.errno  = 0
  }  
}

class ErrorModel extends BaseModel {
  constructor(data, meessage) {
    super(data, meessage)
    this.errno = -1
  }
}

module.exports  = {
  SuccessModel,
  ErrorModel
}

