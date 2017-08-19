const async = require('async');

var Utilities   = require('../util/util.js');
var Toilet      = require('../model/toilet.js').Toilet;
var Avaliation  = require('../model/avaliation.js').Avaliation;
var ObjectId    = require('mongoose').Types.ObjectId;

var NodeGeocoder = require('node-geocoder');

var geocoder = NodeGeocoder(Utilities.geocoderConfig);
 
function save(toilet,avaliations) {

    var toiletId    = toilet._id;
	var toiletIdObj = toiletId ? new ObjectId(toiletId) : toiletId = new ObjectId();
    toilet._id      = toiletIdObj;
   
    var userId    = toilet.userId;
    var userIdObj = new ObjectId(userId);             
    toilet.userId = userIdObj;

      
    var response = {
		"error" : false,
		"message": "ok",
		"data":[]
	};

    return new Promise(function(resolve,reject){
        if(!toilet.lat || !toilet.lng){
            var geocoderAddress = toilet.address+', '+toilet.city+', '+toilet.state+', '+toilet.country;
            geocoder.geocode(geocoderAddress, function(err, res) {
                if(err){
                    response.error   = true;
                    response.message = "Falha ao salvar cagada";
                    resolve(response);
                }else{
                    var location = res[0];
                    var lat = location.latitude;
                    var lng = location.longitude;
                    toilet.lat = lat;
                    toilet.lng = lng;
                    let toilet = new Toilet(toilet);
                    toilet.save(function(err, result){
                        if(avaliations && avaliations.length > 0){
                            avaliations.map(function(avaliation){
                                avaliation.userId   = userIdObj;
                                avaliation.toiletId = toiletIdObj; 
                            });
                            Avaliation.insertMany(avaliations,function(err,result){
                                if(err){
                                    response.error   = true;
                                    response.message = "Falha ao salvar a avaliação da sua cagada";
                                    resolve(response);
                                }
                            });
                        }
                        response.message = "Cagada salva com sucesso";
                        resolve(response);
                    });
                }
            });  
        }else{
            geocoder.reverse({lat: toilet.lat, lon: toilet.lng}).then(function(res){
                if(res && res.raw.status == "OK" ){
                    var location = res[0];
                    this.address = location.streetName+', '+location.streetNumber;
                    this.city    = location.city;
                    if(location.administrativeLevels && location.administrativeLevels.level1short ){
                        this.state   = location.administrativeLevels.level1short;
                    }else{
                        this.state   = location.administrativeLevels.level1short;
                    }
                    this.country = location.country;
                    let toilet = new Toilet(this);
                    toilet.save(function(err, result){
                        if(avaliations && avaliations.length > 0){
                            avaliations.map(function(avaliation){
                                avaliation.userId   = userIdObj;
                                avaliation.toiletId = toiletIdObj; 
                            });
                            Avaliation.insertMany(avaliations,function(err,result){
                                if(err){
                                    response.error   = true;
                                    response.message = "Falha ao salvar a avaliação da sua cagada";
                                    resolve(response);
                                }
                            });
                        }
                        response.message = "Cagada salva com sucesso";
                        resolve(response);
                    });
                }
            }.bind(toilet))
            .catch(function(err){
                response.error   = true;
                response.message = "Falha ao salvar cagada";
                resolve(response);
            });
        }
    }.bind(toilet));
};

function getAll(){ 
   
    var response = {
    	"error" : false,
    	"message": "ok",
    	"data":[]
    };

    return new Promise(function(resolve,reject){
        Toilet.find({}).
        populate({path: 'avaliations', select:'stars observation'}).
        populate({path: 'userId', select:'name nickname'}).
        exec(function (err, result) {
            if(err){
                response.error   = true;
                response.message = "Erro ao buscar banheiros.";
                resolve(response);
            }else if(result.length == 0){
                response.error   = true;
                response.message = "Nenhum banheiro encontrado.";
                resolve(response);
            }else{
                var toilets   = result;
                response.data = toilets;
                resolve(response);     
            }    
        }); 
    });    
};

var exports = module.exports = {
	save   : save,
	getAll : getAll
};



