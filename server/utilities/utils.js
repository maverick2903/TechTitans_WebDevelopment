function generateOtp(){
    let otp
    otp=Math.floor(Math.random()*10000)
    return otp
}

module.exports=generateOtp