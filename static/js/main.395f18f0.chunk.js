(this["webpackJsonpaepp-boilerplate-react"]=this["webpackJsonpaepp-boilerplate-react"]||[]).push([[0],{412:function(e,t,n){},413:function(e,t,n){},563:function(e,t){},565:function(e,t){},577:function(e,t){},579:function(e,t){},590:function(e,t){},623:function(e,t){},694:function(e,t){},811:function(e,t,n){"use strict";n.r(t);var r,a=n(21),c=n(179),s=n.n(c),o=n(194),i=(n(412),n(70)),u=n.n(i),l=n(114),d=n(399),p=n(49),f=(n(413),n.p+"static/media/logo.6ce24c58.svg"),b=n(256),h=n(183),m=n(813),j=n(389),w=n(148),A=n(255),O=n(362),v={ADD_SDK:function(e,t){var n=Object.assign({},e);return n.sdk=t,n},ADD_ADDRESS:function(e,t){var n=Object.assign({},e);return n.address=t,n},ADD_ADDRESS_BALANCE:function(e,t){var n=Object.assign({},e);return n.balance=t,n}},D={sdk:{},address:"",balance:""},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;return t.type in v?v[t.type](e,t.payload):e},x=Object(A.b)(y,Object(A.a)(O.a)),g={testnet:{name:"ae_uat",url:"https://testnet.aeternity.io",middlewareUrl:"https://testnet.aeternity.io/mdw"},mainnet:{name:"ae_mainnet",url:"https://mainnet.aeternity.io",middlewareUrl:"https://mainnet.aeternity.io/mdw"},compilerUrl:"https://compiler.aepps.com"},k=function(){if(!r)throw new Error("Use aeternitySDK first");var e=Object(w.a)({connectionInfo:{id:"spy"}}),t=Object(j.a)({connection:e});return new Promise((function(e){t.scan(function(){var n=Object(l.a)(u.a.mark((function n(a){var c,s;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c=a.newWallet){n.next=3;break}return n.abrupt("return");case 3:if(!window.confirm("Do you want to connect to wallet ".concat(c.name))){n.next=17;break}return n.t0=r,n.next=7,c.getConnection();case 7:return n.t1=n.sent,n.next=10,n.t0.connectToWallet.call(n.t0,n.t1);case 10:return n.next=12,r.subscribeAddress("subscribe","current");case 12:if(s=r.address()){n.next=15;break}return n.abrupt("return");case 15:t.stopScan(),e(s);case 17:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}))},S=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=g.testnet.name,e.next=4,Object(h.a)({url:g.testnet.url,internalUrl:g.testnet.middlewareUrl});case 4:return e.t1=e.sent,e.t2={name:e.t0,instance:e.t1},e.t3=g.mainnet.name,e.next=9,Object(h.a)({url:g.mainnet.url,internalUrl:g.mainnet.middlewareUrl});case 9:return e.t4=e.sent,e.t5={name:e.t3,instance:e.t4},e.t6=[e.t2,e.t5],e.t7=g.compilerUrl,n={nodes:e.t6,compilerUrl:e.t7},t=x.getState(),e.next=17,Object(m.a)(Object(b.a)(Object(b.a)({name:"aepp-boilerplate"},n),{},{onNetworkChange:function(){var e=Object(l.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.selectNode(n.networkId),t.sdk=r,e.next=4,r.address();case 4:t.address=e.sent,r.balance(t.address).then((function(e){var n=Object(p.c)(e)+" "+p.a.AE;t.balance=n})).catch((function(){return"0 "+p.a.AE}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onAddressChange:function(){var e=Object(l.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.sdk=r,e.next=3,r.address();case 3:t.address=e.sent,r.balance(t.address).then((function(e){var n=Object(p.c)(e)+" "+p.a.AE;t.balance=n})).catch((function(){return"0 "+p.a.AE}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onDisconnect:function(){x.dispatch("resetState")}}));case 17:return r=e.sent,e.next=20,k();case 20:return a=e.sent,e.abrupt("return",{client:r,scannedAddress:a});case 24:return e.prev=24,e.t8=e.catch(0),console.error(e.t8),e.abrupt("return");case 28:case"end":return e.stop()}}),e,null,[[0,24]])})));return function(t){return e.apply(this,arguments)}}(),E=n(86),_=Object(o.b)((function(e){return{state:e}}),null)((function(e){var t=e.dispatch,n=Object(a.useState)(null),r=Object(d.a)(n,2),c=r[0],s=r[1];Object(a.useEffect)((function(){try{Object(l.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S();case 2:n=e.sent,t({type:"ADD_SDK",payload:n.client}),t({type:"ADD_ADDRESS",payload:n.scannedAddress}),console.log("Current Address",n.scannedAddress),n.client.balance(n.scannedAddress).then((function(e){var n=Object(p.c)(e)+" "+p.a.AE;t({type:"ADD_ADDRESS_BALANCE",payload:n}),console.log("Current Balance",n)})).catch((function(){return"0 "+p.a.AE})),s(!0);case 8:case"end":return e.stop()}}),e)})))()}catch(e){console.error("SDK not loaded correctly or loaded for the first time",e),s(!1)}}),[t]);return Object(E.jsx)("div",{className:"App",children:Object(E.jsxs)("header",{className:"App-header",children:[Object(E.jsx)("img",{src:f,className:"App-logo",alt:"logo"}),Object(E.jsx)("p",{children:c?"See console for the connected account details":"Account not connected"}),Object(E.jsx)("a",{className:"App-link",href:"https://aeternity.com/awesome-aeternity",target:"_blank",rel:"noopener noreferrer",children:"awesome \xe6ternity"})]})})})),C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,815)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};window.store=x,s.a.render(Object(E.jsx)(o.a,{store:x,children:Object(E.jsx)(_,{})}),document.getElementById("root")),C()}},[[811,1,2]]]);
//# sourceMappingURL=main.395f18f0.chunk.js.map