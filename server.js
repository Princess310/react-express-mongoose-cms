import express from 'express';
import session from 'express-session';
import path from 'path';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import logger from 'morgan';
import bodyParser from 'body-parser';
import React from 'react';
import routes from './app/routes';
import mongoose from 'mongoose';
import config from './config';
import News from './models/News';
import NavType from './models/NavType';

var app = express();

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecting");
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({  
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}));

// 拦截admin页面未登录状态
app.use(function(req, res, next){
	let url = req.url;
	if(url != "/login" && url.startsWith("/admin") && !req.session.user){
		return res.redirect("/login");
	}

	next();
});

app.post('/api/login', function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	let admin = config.user;

	if(username === "" || password === ""){
		return res.status(604).send({ message: 'username or password can not be empty!' });
	}

	if(admin.name !== username || admin.password !== password){
		return res.status(604).send({ message: 'username or password invalid' });
	}
	
	req.session.user = {username: username};
	return res.status(200).send({ message: 'Login Successfully!' });
});

app.get('/api/news', function(req, res){
	let currentPage = req.query.currentPage;
	let type = req.query.type;
	let pageSize = Number(req.query.pageSize);
	let startLine = Number((currentPage -1)*pageSize);
	let condition = {};

	if(type !== "0"){
		condition = {
			parrentNav: type
		};
	}

	NavType.find({pid: type}).exec(function(err, types){
		if (err) return next(err);

		if(types.length > 0){
			let needTypes = [];

			types.map((nav, index) => {
				needTypes.push(nav.navTypeId);
			});

			let query = News.find().where("parrentNav").in(needTypes).skip(startLine).limit(pageSize).sort('-utime');

			query.exec(function(err, news){
				if (err) return next(err);

				query.count(function(err, count){
					if (err) return next(err)

						let page = {
							total: count,
							pageCount: Math.ceil(count / pageSize)
						};
						let result = {list: news, page: page};

						return res.send(result);
				});
			});
		}else{
			let query = News.find(condition).skip(startLine).limit(pageSize).sort('-utime');

			query.exec(function(err, news){
				if (err) return next(err);

				query.count(function(err, count){
					if (err) return next(err);

						let page = {
							total: count,
							pageCount: Math.ceil(count / pageSize)
						};
						let result = {list: news, page: page};

						return res.send(result);
				});
			});
		}
	});
});

app.get('/api/newsByTag', function(req, res){
	let currentPage = req.query.currentPage;
	let type = req.query.type;
	let subType = req.query.subType;
	let pageSize = Number(req.query.pageSize);
	let startLine = Number((currentPage -1)*pageSize);
	let condition = {
		type: type
	};

	NavType.findOne(condition).exec(function(err, type){
		if (err) return next(err);

		NavType.findOne({type: subType, pid: type.navTypeId}).exec(function(err, subType){
			if (err) return next(err);

			let query = News.find({parrentNav: subType.navTypeId}).skip(startLine).limit(pageSize).sort('-utime');

			query.exec(function(err, news){
				if (err) return next(err);

				query.count(function(err, count){
					if (err) return next(err)

						let page = {
							total: count,
							pageCount: Math.ceil(count / pageSize)
						};
						let result = {list: news, page: page};

						return res.send(result);
				});
			});
		});
	});
});

app.get('/api/getNews', function(req, res){
	let id = req.query.id;

	News.findOne({newsId: id}, function(err, news){
		if (err) return next(err);
		let type = news.parrentNav;

		NavType.findOne({navTypeId: type}, function(err, type){
			if (err) return next(err);

			NavType.findOne({navTypeId: type.pid}, function(err, parrentType){
				if (err) return next(err);

				return res.send({news: news, type: type, parrentType: parrentType});
			});
		});
	});
});

app.get('/api/getNewsInfo', function(req, res){
	let id = req.query.id;

	News.findOne({newsId: id}, function(err, news){
		if (err) return next(err);
		
		return res.send({news: news});
	});
});

app.post("/api/saveNews", function(req, res){
	let news = req.body;

	news.newsId = (new Date()).getTime();

	News.create(news, function(err, news){
		if (err) return next(err);

		res.send({ message: 'News has been added successfully!' });
	});
});

app.post("/api/updateNews", function(req, res){
	let news = req.body;

	news.utime = new Date();

	News.update({newsId: news.newsId}, news, function(err){
		if (err) return next(err);

		res.send({ message: 'News has been updated successfully!' });
	});
});

app.post("/api/deletNews", function(req, res){
	let id = req.body.id;

	News.findOneAndRemove({_id: id}, function(err){
		if (err) return next(err);

		res.send({ message: 'News has been deleted successfully!' });
	});
});

app.get("/api/navType", function(req, res){
	let condition = function(){
		return (!this.pid || this.pid === "");
	};

	if(req.query.onlyTypes){
		condition = function(){
			return ((!this.pid || this.pid === "") && this.type !== "all");
		};
	}

	NavType.find().$where(condition).sort('navTypeId').exec(function(err, navTypes){
		if (err) return next(err);

		return res.send({list : navTypes});
	});
});

app.get("/api/getSubType", function(req, res){
	let pid = req.query.pid;

	NavType.find({pid: pid}).exec(function(err, subTypes){
		if (err) return next(err);

		return res.send({list : subTypes});
	});
});

app.get("/api/getTypeInfo", function(req, res){
	let id = req.query.id;

	NavType.find({navTypeId: id}).exec(function(err, type){
		if (err) return next(err);

		return res.send({type : type});
	});
});

app.post("/api/saveTypeInfo", function(req, res){
	let id = req.body.id;
	let name = req.body.name;

	NavType.update({_id: id}, {name: name}, function(err, navType){
		if(err) return next(err);

		return res.status(200).send({ message: '修改成功!' });
	});
});

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
	if (err) {
	  res.status(500).send(err.message)
	} else if (redirect) {
	  res.redirect(redirect.pathname + redirect.search)
	} else if (props) {
	  // hey we made it!
	  const appHtml = renderToString(<RouterContext {...props}/>)
	  res.send(renderPage(appHtml))
	} else {
	  res.status(404).send('Not Found')
	}
  })
})

function renderPage(appHtml) {
  return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>阿里健</title>
		<link rel="stylesheet" href="/css/main.css"/>
	</head>
	<body>
	<div id="app">${appHtml}</div>
	<script src="/js/vendor.js"></script>
	<script src="/js/vendor.bundle.js"></script>
	<script src="/js/bundle.js"></script>
	</body>
	</html>
   `
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});