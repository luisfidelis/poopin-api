'use strict';

<<<<<<< HEAD
var bcrypt 	     = require('bcrypt');
var SMTPService  = require('./smtp.js');
var User         = require('../model/user.js').User;
var ObjectId     = require('mongoose').Types.ObjectId;
var Utilities    = require('../util/util.js');
var createToken  = require('../util/token.js').createToken;
//var mongoose     = require('mongoose')
//mongoose.Promise = require('bluebird');
=======
var bcrypt = require('bcrypt');
var SMTPService = require('./smtp.js');
var User = require('../model/user.js').User;
var ObjectId = require('mongoose').Types.ObjectId;
var Utilities = require('../util/util.js');
>>>>>>> fadecc478f4c460cf4d4067eade11027af8c493c

const saltRounds = 10;

function save(userRequest) {

	var userId = userRequest._id;
	var userMail = userRequest.email;

	var response = {
		"error": false,
		"message": "ok",
		"data": []
	};

	if (userId) {
		return new Promise((resolve, reject) => {
			User.findOne({ _id: new ObjectId(userId) }, (err, user) => {
				if (err) {
					response.error = true;
					response.message = "Falha ao salvar usuário";
					resolve(response);
				}

				if (user) {
					user.name = userRequest.name;
					user.nickname = userRequest.nickname;
					user.birthDate = userRequest.birthDate;
					User.update(user, (err, raw) => {
						if (err) {
							response.error = true;
							response.message = "Falha ao atualizar usuário";
							resolve(response);
						}
						response.message = 'Cagão editado com sucesso';
						resolve(response);
					});
				}
			});
		});
	} else {
		return new Promise((resolve, reject) => {
			User.findByEmail(userMail, (err, result) => {
				if (err) {
					response.error = true;
					response.message = "Falha ao salvar usuário";
					resolve(response);
				}
				if (result) {
					response.error = true;
					response.message = "E-mail já cadastrado";
					resolve(response);
				} else {
					bcrypt.hash(userRequest.password, saltRounds, (err, hash) => {
						if (err) {
							response.error = true;
							response.message = "Falha ao salvar usuário";
							resolve(response);
						} else {
							userRequest._id = new ObjectId();
							userRequest.password = hash;
							var newUser  = new User(userRequest);
							newUser.save((err, raw) => {
								if(err){
						    		response.error = true;
						            response.message = "Falha ao salvar usuário";
						            resolve(response);
						    	}
						    	if(raw){
					            	// setup email data with unicode symbols
					            	let savedUser = raw;			
						           	var message   = 'Parabéns por se tornar um novo cagão na plataforma Poopin, '+savedUser.name;
						           	if(savedUser.nickname){
						           		message +=', ou melhor, '+savedUser.nickname;
						           	}
						           	message += '.';

									var mailOptions = {
									    from    : '"L3Projects👻" <l3projectsweb@gmail.com>', // sender address
									    to 		: savedUser.email, // list of receivers
									    subject : 'Novo cagão', // Subject line
									    text    : message, // plain text body
									    html    : '<h1>'+message+'</h1>' // html body
									};

									SMTPService.sendMail(mailOptions);
	
					            	response.data.push({
										"id" 			: savedUser._id.toString(),
										"accessToken"	: createToken(savedUser._id.toString())
					            	});
					            	resolve(response);
					            }
	        				});
						}
					});
				}
			});
		});
	}
};

function login(options) {

	var userMail = options.email;
	var userPassword = options.password;

	var response = {
		"error": false,
		"message": "ok",
		"data": []
	};

	return new Promise((resolve, reject) => {
		User.findByEmail(userMail, (err, result) => {
			if (err) {
				response.error = true;
		        response.message = "Falhar ao realizar login";
		        resolve(response);
		    }

		    if(result){
		    	var user  = result;
		    	bcrypt.compare(userPassword, user.password, (err, result)=>{
		    		if(err || !result){
		    			response.error = true;
		    			response.message = "E-mail ou senha incorretos";
		    			resolve(response);
		    		}else{
		    			response.data.push({
							"id"     	   	: user._id,
							"accessToken"	: createToken(user._id.toString()),
		    				"email" 		: user.email,
		    				"name" 			: user.name,
		    				"nickname"  	: user.nickname,
		    				"birthDate" 	: user.birthDate instanceof Date ? Utilities.formattedDate(user.birthDate) : null
		    			});
		    			resolve(response);
		    		}            	
		    	});
		    }else{
		    	response.error = true;
        		response.message = "E-mail ou senha incorretos";
        		resolve(response);
        	}
   		});
   	});	
};


const _buildMailStructure = (message) => {
	return `
		<style>
			.email-body{
				background:#fff;
			}
			.email-container {
				max-width:500px;
				margin: 0 auto;
			}
			.header {
				background:#e74c3c;
				padding:50px;
			}
			.header hgroup {
				text-align:center;
				font-family:verdana;
			}
			.header hgroup h1 {
				font-size: 2em;
				color: #fff;
				font-weight: bold;
				letter-spacing:.3em;
				text-transform:uppercase;
			}
			.header hgroup h2 {
				padding:20px 0 0 0;
				font-size:.75em;
				color:#121212;
			}
			.section1 {
				padding:20px;
				color:#666;
				font-family: verdana;
				background: #ecf0f1;
				text-align: center;
			}
			.section1 h1 {
				font-size:1.2em;
				color: #121212;
				text-align: center;
			}
			.section1 p {
				line-height:1.5em;
				padding: 20px 0;
				font-size:.75em;
				text-align: center;
			}
			.section1 img {
				width:60%;
				padding-top:20px;
			}
			.footer{
				padding:20px;
				text-align:center;
				background:#7f8c8d;
				color:#A0AAAB;
			}
		</style>
		<div class="email-body">
			<div class="email-container">
			<div class="header">
				<hgroup>
				<h1>Olá, seu cagão!</h1>
				<h2>Seu cadastro foi realizado com sucesso</h2>
				</hgroup>      
			</div>
			<div class="section1">
				<h1>${message}</h1>
				<img src="https://i.imgur.com/vhanSZD.png">
				<p>:)</p>
			</div>
			<div class="footer">
				<p>Site do Poopin</p>
			</div>
			</div>
		</div>
	`;
};

var exports = module.exports = {
	save: save,
	login: login
};



