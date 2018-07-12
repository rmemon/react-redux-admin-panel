export const parseJwt = (token) => {
    if (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    return;
}
Date.prototype.mediumDate = function() {

    if(Object.prototype.toString.call(this) === "[object Date]")
    {
        if (isNaN(this.getTime()))
        {
            return ''
        }
        else
        {
            let dateString = this.toDateString().split(' ').splice(1).join(' '),
            timeString = this.toTimeString().split(' ')[0];
            return `${dateString}, ${timeString}`;
        }
    }
    else
    {
        return '';
    }
}

export const serverDownError = {
      "error": {
        "message": "Something went wrong",
        "status_code": 422
      }
  }
