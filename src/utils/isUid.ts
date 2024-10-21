export function isUid(uid:string){
    if(uid.split('-').length !== 5) {
      return false;
    }
      const regexp = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
      if(regexp.test(uid) === false) return false;
      else return true;
    }