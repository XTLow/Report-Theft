const axios = require('axios').default;
var qs = require('qs');

const server = 'http://10.0.2.2:5577';
export default class API {

    static async getTheftFromRange(rangeKM,lat,lon){           
        return axios.get(server+'/Theft/GetTheft',{ params:{ range : rangeKM, latitude : lat, longitude : lon}});        
    }
    static async getTheftFromRange(rangeKM,data,lat,lon){           
        return axios.get(server+'/Theft/GetTheft',{ params:{ range : rangeKM, date : data, latitude : lat, longitude : lon}});        
    }
    static async getCountReportToday(){        
        return axios.get(server+'/Theft/GetCount');        
    }
    static async postTheft(desc,data,hora,lat,long,tipo){            
        var obj = { params :{ descricao : desc, date : data, hour : hora, latitude : lat, longitude : long, type : tipo}};
        //return axios.post(server+'/Theft/PostTheft',obj,{ headers : { 'content-type': 'application/json', },});   
        return axios({
            method: 'post',
            url: server+'/Theft/PostTheft',
            params: {
                descricao : desc, 
                date : data,
                hour : hora,
                latitude : lat,
                longitude : long,
                type : tipo
            }
          });
    }
}