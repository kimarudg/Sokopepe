(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/*!
 * Title Alert 0.7
 * 
 * Copyright (c) 2009 ESN | http://esn.me
 * Jonatan Heyman | http://heyman.info
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
(function(a){a.titleAlert=function(e,c){if(a.titleAlert._running){a.titleAlert.stop()}a.titleAlert._settings=c=a.extend({},a.titleAlert.defaults,c);if(c.requireBlur&&a.titleAlert.hasFocus){return}c.originalTitleInterval=c.originalTitleInterval||c.interval;a.titleAlert._running=true;a.titleAlert._initialText=document.title;document.title=e;var b=true;var d=function(){if(!a.titleAlert._running){return}b=!b;document.title=(b?e:a.titleAlert._initialText);a.titleAlert._intervalToken=setTimeout(d,(b?c.interval:c.originalTitleInterval))};a.titleAlert._intervalToken=setTimeout(d,c.interval);if(c.stopOnMouseMove){a(document).mousemove(function(f){a(this).unbind(f);a.titleAlert.stop()})}if(c.duration>0){a.titleAlert._timeoutToken=setTimeout(function(){a.titleAlert.stop()},c.duration)}};a.titleAlert.defaults={interval:500,originalTitleInterval:null,duration:0,stopOnFocus:true,requireBlur:false,stopOnMouseMove:false};a.titleAlert.stop=function(){clearTimeout(a.titleAlert._intervalToken);clearTimeout(a.titleAlert._timeoutToken);document.title=a.titleAlert._initialText;a.titleAlert._timeoutToken=null;a.titleAlert._intervalToken=null;a.titleAlert._initialText=null;a.titleAlert._running=false;a.titleAlert._settings=null};a.titleAlert.hasFocus=true;a.titleAlert._running=false;a.titleAlert._intervalToken=null;a.titleAlert._timeoutToken=null;a.titleAlert._initialText=null;a.titleAlert._settings=null;a.titleAlert._focus=function(){a.titleAlert.hasFocus=true;if(a.titleAlert._running&&a.titleAlert._settings.stopOnFocus){var b=a.titleAlert._initialText;a.titleAlert.stop();setTimeout(function(){if(a.titleAlert._running){return}document.title=".";document.title=b},1000)}};a.titleAlert._blur=function(){a.titleAlert.hasFocus=false};a(window).bind("focus",a.titleAlert._focus);a(window).bind("blur",a.titleAlert._blur)})(jQuery);;
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();;
/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * $.jStorage
 *
 * USAGE:
 *
 * jStorage requires Prototype, MooTools or jQuery! If jQuery is used, then
 * jQuery-JSON (http://code.google.com/p/jquery-json/) is also needed.
 * (jQuery-JSON needs to be loaded BEFORE jStorage!)
 *
 * Methods:
 *
 * -set(key, value[, options])
 * $.jStorage.set(key, value) -> saves a value
 *
 * -get(key[, default])
 * value = $.jStorage.get(key [, default]) ->
 *    retrieves value if key exists, or default if it doesn't
 *
 * -deleteKey(key)
 * $.jStorage.deleteKey(key) -> removes a key from the storage
 *
 * -flush()
 * $.jStorage.flush() -> clears the cache
 *
 * -storageObj()
 * $.jStorage.storageObj() -> returns a read-ony copy of the actual storage
 *
 * -storageSize()
 * $.jStorage.storageSize() -> returns the size of the storage in bytes
 *
 * -index()
 * $.jStorage.index() -> returns the used keys as an array
 *
 * -storageAvailable()
 * $.jStorage.storageAvailable() -> returns true if storage is available
 *
 * -reInit()
 * $.jStorage.reInit() -> reloads the data from browser storage
 *
 * <value> can be any JSON-able value, including objects and arrays.
 *
 **/

(function($){
    if(!$ || !($.toJSON || Object.toJSON || window.JSON)){
        throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
    }

    var
        /* This is the object, that holds the cached values */
        _storage = {},

        /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,

        /* How much space does the storage take */
        _storage_size = 0,

        /* function to encode objects to JSON strings */
        json_encode = $.toJSON || Object.toJSON || (window.JSON && (JSON.encode || JSON.stringify)),

        /* function to decode objects from JSON strings */
        json_decode = $.evalJSON || (window.JSON && (JSON.decode || JSON.parse)) || function(str){
            return String(str).evalJSON();
        },

        /* which backend is currently used */
        _backend = false,

        /* Next check for TTL */
        _ttl_timeout,

        /**
         * XML encoding and decoding as XML nodes can't be JSON'ized
         * XML nodes are encoded and decoded if the node is the value to be saved
         * but not if it's as a property of another object
         * Eg. -
         *   $.jStorage.set("key", xmlNode);        // IS OK
         *   $.jStorage.set("key", {xml: xmlNode}); // NOT OK
         */
        _XMLService = {

            /**
             * Validates a XML node to be XML
             * based on jQuery.isXML function
             */
            isXML: function(elm){
                var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            },

            /**
             * Encodes a XML node to string
             * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
             */
            encode: function(xmlNode) {
                if(!this.isXML(xmlNode)){
                    return false;
                }
                try{ // Mozilla, Webkit, Opera
                    return new XMLSerializer().serializeToString(xmlNode);
                }catch(E1) {
                    try {  // IE
                        return xmlNode.xml;
                    }catch(E2){}
                }
                return false;
            },

            /**
             * Decodes a XML node from string
             * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
             */
            decode: function(xmlString){
                var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString) ||
                        (window.ActiveXObject && function(_xmlString) {
                    var xml_doc = new ActiveXObject('Microsoft.XMLDOM');
                    xml_doc.async = 'false';
                    xml_doc.loadXML(_xmlString);
                    return xml_doc;
                }),
                resultXML;
                if(!dom_parser){
                    return false;
                }
                resultXML = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, xmlString, 'text/xml');
                return this.isXML(resultXML)?resultXML:false;
            }
        };

    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     * @returns undefined
     */
    function _init(){
        /* Check if browser supports localStorage */
        var localStorageReallyWorks = false;
        if("localStorage" in window){
            try {
                window.localStorage.setItem('_tmptest', 'tmpval');
                localStorageReallyWorks = true;
                window.localStorage.removeItem('_tmptest');
            } catch(BogusQuotaExceededErrorOnIos5) {
                // Thanks be to iOS5 Private Browsing mode which throws
                // QUOTA_EXCEEDED_ERRROR DOM Exception 22.
            }
        }
        if(localStorageReallyWorks){
            try {
                if(window.localStorage) {
                    _storage_service = window.localStorage;
                    _backend = "localStorage";
                }
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    _storage_service = window.globalStorage[window.location.hostname];
                    _backend = "globalStorage";
                }
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement('link');
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        _load_storage();

        // remove dead keys
        _handleTTL();
    }

    /**
     * Loads the data from the storage based on the supported mechanism
     * @returns undefined
     */
    function _load_storage(){
        /* if jStorage string is retrieved, then decode it */
        if(_storage_service.jStorage){
            try{
                _storage = json_decode(String(_storage_service.jStorage));
            }catch(E6){_storage_service.jStorage = "{}";}
        }else{
            _storage_service.jStorage = "{}";
        }
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     * @returns undefined
     */
    function _save(){
        try{
            _storage_service.jStorage = json_encode(_storage);
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
        }catch(E7){/* probably cache is full, nothing is saved this way*/}
    }

    /**
     * Function checks if a key is set and is string or numberic
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError('Key name must be string or numeric');
        }
        if(key == "__jstorage_meta"){
            throw new TypeError('Reserved key name');
        }
        return true;
    }

    /**
     * Removes expired keys
     */
    function _handleTTL(){
        var curtime, i, TTL, nextExpire = Infinity, changed = false;

        clearTimeout(_ttl_timeout);

        if(!_storage.__jstorage_meta || typeof _storage.__jstorage_meta.TTL != "object"){
            // nothing to do here
            return;
        }

        curtime = +new Date();
        TTL = _storage.__jstorage_meta.TTL;
        for(i in TTL){
            if(TTL.hasOwnProperty(i)){
                if(TTL[i] <= curtime){
                    delete TTL[i];
                    delete _storage[i];
                    changed = true;
                }else if(TTL[i] < nextExpire){
                    nextExpire = TTL[i];
                }
            }
        }

        // set next check
        if(nextExpire != Infinity){
            _ttl_timeout = setTimeout(_handleTTL, nextExpire - curtime);
        }

        // save changes
        if(changed){
            _save();
        }
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.drupalchatjStorage = {
        /* Version number */
        version: "0.1.7.0",

        /**
         * Sets a key's value.
         *
         * @param {String} key - Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param {Mixed} value - Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @param {Object} [options] - possible options to use
         * @param {Number} [options.TTL] - optional TTL value
         * @returns the used value
         */
        set: function(key, value, options){
            _checkKey(key);

            options = options || {};

            if(_XMLService.isXML(value)){
                value = {_is_xml:true,xml:_XMLService.encode(value)};
            }else if(typeof value == "function"){
                value = null; // functions can't be saved!
            }else if(value && typeof value == "object"){
                // clone the object before saving to _storage tree
                value = json_decode(json_encode(value));
            }
            _storage[key] = value;

            if(!isNaN(options.TTL)){
                this.setTTL(key, options.TTL);
                // also handles saving
            }else{
                _save();
            }
            return value;
        },

        /**
         * Looks up a key in cache
         *
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @returns the key value, default value or <null>
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(_storage[key] && typeof _storage[key] == "object" &&
                        _storage[key]._is_xml &&
                            _storage[key]._is_xml){
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == 'undefined' ? null : def;
        },

        /**
         * Deletes a key from cache.
         *
         * @param {String} key - Key to delete.
         * @returns true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                // remove from TTL list
                if(_storage.__jstorage_meta &&
                  typeof _storage.__jstorage_meta.TTL == "object" &&
                  key in _storage.__jstorage_meta.TTL){
                    delete _storage.__jstorage_meta.TTL[key];
                }
                _save();
                return true;
            }
            return false;
        },

        /**
         * Sets a TTL for a key, or remove it if ttl value is 0 or below
         *
         * @param {String} key - key to set the TTL for
         * @param {Number} ttl - TTL timeout in milliseconds
         * @returns true if key existed or false if it didn't
         */
        setTTL: function(key, ttl){
            var curtime = +new Date();
            _checkKey(key);
            ttl = Number(ttl) || 0;
            if(key in _storage){

                if(!_storage.__jstorage_meta){
                    _storage.__jstorage_meta = {};
                }
                if(!_storage.__jstorage_meta.TTL){
                    _storage.__jstorage_meta.TTL = {};
                }

                // Set TTL value for the key
                if(ttl>0){
                    _storage.__jstorage_meta.TTL[key] = curtime + ttl;
                }else{
                    delete _storage.__jstorage_meta.TTL[key];
                }

                _save();

                _handleTTL();
                return true;
            }
            return false;
        },

        /**
         * Deletes everything in cache.
         *
         * @return true
         */
        flush: function(){
            _storage = {};
            _save();
            return true;
        },

        /**
         * Returns a read-only copy of _storage
         *
         * @returns Object
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },

        /**
         * Returns an index of all used keys as an array
         * ['key1', 'key2',..'keyN']
         *
         * @returns Array
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i) && i != "__jstorage_meta"){
                    index.push(i);
                }
            }
            return index;
        },

        /**
         * How much space in bytes does the storage take?
         *
         * @returns Number
         */
        storageSize: function(){
            return _storage_size;
        },

        /**
         * Which backend is currently in use?
         *
         * @returns String
         */
        currentBackend: function(){
            return _backend;
        },

        /**
         * Test if storage is available
         *
         * @returns Boolean
         */
        storageAvailable: function(){
            return !!_backend;
        },

        /**
         * Reloads the data from browser storage
         *
         * @returns undefined
         */
        reInit: function(){
            var new_storage_elm, data;
            if(_storage_elm && _storage_elm.addBehavior){
                new_storage_elm = document.createElement('link');

                _storage_elm.parentNode.replaceChild(new_storage_elm, _storage_elm);
                _storage_elm = new_storage_elm;

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }

            _load_storage();
        }
    };

    // Initialize jStorage
    _init();

})(window.$ || window.jQuery);
;
(function ($) {

  Drupal.drupalchat = Drupal.drupalchat || {};

  Drupal.drupalchat.sendMessages = function() {
	jQuery.post(Drupal.settings.drupalchat.sendUrl, {
	  drupalchat_message_id: drupalchat.send_current_message_id,
   	  drupalchat_uid2: drupalchat.send_current_uid2, 
   	  drupalchat_message: drupalchat.send_current_message 
	});
  };
  
  Drupal.drupalchat.checkChatBoxInputKey = function(event, chatboxtextarea, chatboxtitle) {
    if(event.keyCode == 13 && event.shiftKey == 0)  {
	  message = jQuery(chatboxtextarea).val();
	  message = message.replace(/^\s+|\s+$/g,"");
	  message = message.substr(0,255);
	  jQuery(chatboxtextarea).val('');
	  jQuery(chatboxtextarea).focus();
	  jQuery(chatboxtextarea).css('height','44px');
	  var currentTime = new Date();
	  var hours = currentTime.getHours();
	  var minutes = currentTime.getMinutes();
	  if (hours < 10) {
	    hours = "0" + hours;
	  }
	  if (minutes < 10) {
	    minutes = "0" + minutes;
	  }
	  if (message != '') {
	    if(Drupal.settings.drupalchat.polling_method == '0') {
		  drupalchat.send_current_uid2 = chatboxtitle;
		    if (drupalchat.attach_messages_in_queue == 0) {
			  setTimeout(function() {
			    Drupal.drupalchat.sendMessages();
				drupalchat.attach_messages_in_queue = 0;
			  }, (Drupal.settings.drupalchat.send_rate) * 1000);
			  drupalchat.send_current_message = message;
			  var d = new Date();
			  drupalchat.send_current_message_id = 'm_' + Drupal.settings.drupalchat.uid + '_' + drupalchat.send_current_uid2 + '_' + d.getTime();  
			  drupalchat.attach_messages_in_queue = 1;
			}
			else {
			  drupalchat.send_current_message += '{{drupalchat_newline}}' + message;
			}
		}
		else {
		  drupalchat.send_current_uid2 = chatboxtitle;
          drupalchat.send_current_message = message;
		  var d = new Date();
		  drupalchat.send_current_message_id = 'm_' + Drupal.settings.drupalchat.uid + '_' + drupalchat.send_current_uid2 + '_' + d.getTime();
          Drupal.drupalchat.sendMessages();
        }
        message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
        message = emotify(message);
        if (jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent .chatboxusername a:last").html() == Drupal.settings.drupalchat.username) {
          jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<p class=\''+drupalchat.send_current_message_id+'\'>'+message+'</p>');
        }
        else {
          jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxusername"><span class="chatboxtime">'+hours+':'+minutes+'</span><a href="'+Drupal.settings.basePath+'user/'+Drupal.settings.drupalchat.uid+'">'+Drupal.settings.drupalchat.username+'</a></div><p class=\''+drupalchat.send_current_message_id+'\'>'+message+'</p>');
        }
		jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop(jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
	  }
      return false;
	}

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 94;

    if (maxHeight > adjustedHeight) {
      adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
    if (maxHeight)
      adjustedHeight = Math.min(maxHeight, adjustedHeight);
    if (adjustedHeight > chatboxtextarea.clientHeight)
      jQuery(chatboxtextarea).css('height', adjustedHeight+8 + 'px');
    } 
	else {
      jQuery(chatboxtextarea).css('overflow', 'auto');
    }
    return true;
  };
  
  Drupal.drupalchat.changeStatus = function(id, state) {
	if(state == 1) {
	  jQuery('#' + id + ' .subpanel_title > div').removeClass('status-0').addClass('status-1');
	  jQuery('#' + id + ' .drupalchat_userOffline').css('display','none');
	}
	else if(state == 0) {
	  jQuery('#' + id + ' .subpanel_title > div').removeClass('status-1').addClass('status-0');
	  jQuery('#' + id + ' .drupalchat_userOffline').css('display','block');
	}
  };

})(jQuery);

var drupalchat = {
	username: null,
	uid: null,
	send_current_message: null,
	send_current_message_id: null,
	last_timestamp: 0,
	send_current_uid2: 0,
	attach_messages_in_queue: 0,
	running: 0,
	online_users: 0,
	/*smilies: { 
    //smiley     image_url          title_text              alt_smilies           
    ":)":    [ "1.gif",        "happy",                ":-)"                 ],
    ":(":    [ "2.gif",         "sad",                  ":-("                 ],
    ";)":    [ "3.gif",        "winking",              ";-)"                 ],
    ":D":    [ "4.gif",         "big grin",             ":-D"                 ],
    "^_^":   [ "muhaha.gif",      "happy eyes"                                  ],
    ">:o":   [ "haha.gif",        "laughing eyes"                               ],
    ":3":    [ "hohoho.png",      "laughing eyes"                               ],
    ">:-(":  [ "waiting.png",     "grumpy",               "X-(","X(","x-(","x(" ],
    ":'(":   [ "crying.png",      "crying"                                      ],
    ":o":    [ "omg.png",         "shocked",              ":-o"                 ],
    "8)":    [ "cool.png",        "glass",                "8-)","B)","B-)"      ],
    "8-|":   [ "ouch.png",        "cool",                 "8-|"                 ],
    ":p":    [ "tongue.png",      "tongue",               ":-p",":P",":-P"      ],
    "O.o":   [ "stupid-idea.png", "woot?!"                                      ],
    "-_-":   [ "huh-where.png",   "dark emote"                                  ],
    ":/":    [ "oopsy.png",       "duhhh",                ":-/",":\\",":-\\"    ],
    ":*":    [ "kiss.png",        "kiss",                 ":-*"                 ],
    "<3":    [ "love.png",        "heart",                                      ],
    "3:)":   [ "very-devil-plan.png", "devil smile"                                 ],
    "O:)":   [ "idiotic-smile.png",   "angel"                                       ]
  }*/
  smilies: { /*
    smiley     image_url          title_text              alt_smilies           */
    ":)":    [ "1.gif",           "happy",                ":-)"                 ],
    ":(":    [ "2.gif",           "sad",                  ":-("                 ],
    ";)":    [ "3.gif",           "winking",              ";-)"                 ],
    ":D":    [ "4.gif",           "big grin",             ":-D"                 ],
    ";;)":   [ "5.gif",           "batting eyelashes"                           ],
    ">:D<":  [ "6.gif",           "big hug"                                     ],
    ":-/":   [ "7.gif",           "confused",             ":/"                  ],
    ":x":    [ "8.gif",           "love struck",          ":X"                  ],
    ":\">":  [ "9.gif",           "blushing"                                    ],
    ":P":    [ "10.gif",          "tongue",               ":p", ":-p", ":-P"    ],
    ":-*":   [ "11.gif",          "kiss",                 ":*"                  ],
    "=((":   [ "12.gif",          "broken heart"                                ],
    ":-O":   [ "13.gif",          "surprise",             ":O"                  ],
    "X(":    [ "14.gif",          "angry"                                       ],
    ":>":    [ "15.gif",          "smug"                                        ],
    "B-)":   [ "16.gif",          "cool"                                        ],
    ":-S":   [ "17.gif",          "worried"                                     ],
    "#:-S":  [ "18.gif",          "whew!",                "#:-s"                ],
    ">:)":   [ "19.gif",          "devil",                ">:-)"                ],
    ":((":   [ "20.gif",          "crying",               ":-((", ":'(", ":'-(" ],
    ":))":   [ "21.gif",          "laughing",             ":-))"                ],
    ":|":    [ "22.gif",          "straight face",        ":-|"                 ],
    "/:)":   [ "23.gif",          "raised eyebrow",       "/:-)"                ],
    "=))":   [ "24.gif",          "rolling on the floor"                        ],
    "O:-)":  [ "25.gif",          "angel",                "O:)"                 ],
    ":-B":   [ "26.gif",          "nerd"                                        ],
    "=;":    [ "27.gif",          "talk to the hand"                            ],
    "I-)":   [ "28.gif",          "sleepy"                                      ],
    "8-|":   [ "29.gif",          "rolling eyes"                                ],
    "L-)":   [ "30.gif",          "loser"                                       ],
    ":-&":   [ "31.gif",          "sick"                                        ],
    ":-$":   [ "32.gif",          "don't tell anyone"                           ],
    "[-(":   [ "33.gif",          "not talking"                                 ],
    ":O)":   [ "34.gif",          "clown"                                       ],
    "8-}":   [ "35.gif",          "silly"                                       ],
    "<:-P":  [ "36.gif",          "party",                "<:-p"                ],
    "(:|":   [ "37.gif",          "yawn"                                        ],
    "=P~":   [ "38.gif",          "drooling"                                    ],
    ":-?":   [ "39.gif",          "thinking"                                    ],
    "#-o":   [ "40.gif",          "d'oh",                 "#-O"                 ],
    "=D>":   [ "41.gif",          "applause"                                    ],
    ":-SS":  [ "42.gif",          "nailbiting",           ":-ss"                ],
    "@-)":   [ "43.gif",          "hypnotized"                                  ],
    ":^o":   [ "44.gif",          "liar"                                        ],
    ":-w":   [ "45.gif",          "waiting",              ":-W"                 ],
    ":-<":   [ "46.gif",          "sigh"                                        ],
    ">:P":   [ "47.gif",          "phbbbbt",              ">:p"                 ],
    "<):)":  [ "48.gif",          "cowboy"                                      ],
    ":@)":   [ "49.gif",          "pig"                                         ],
    "3:-O":  [ "50.gif",          "cow",                  "3:-o"                ],
    ":(|)":  [ "51.gif",          "monkey"                                      ],
    "~:>":   [ "52.gif",          "chicken"                                     ],
    "@};-":  [ "53.gif",          "rose"                                        ],
    "%%-":   [ "54.gif",          "good luck"                                   ],
    "**==":  [ "55.gif",          "flag"                                        ],
    "(~~)":  [ "56.gif",          "pumpkin"                                     ],
    "~O)":   [ "57.gif",          "coffee"                                      ],
    "*-:)":  [ "58.gif",          "idea"                                        ],
    "8-X":   [ "59.gif",          "skull"                                       ],
    "=:)":   [ "60.gif",          "bug"                                         ],
    ">-)":   [ "61.gif",          "alien"                                       ],
    ":-L":   [ "62.gif",          "frustrated",           ":L"                  ],
    "[-O<":  [ "63.gif",          "praying"                                     ],
    "$-)":   [ "64.gif",          "money eyes"                                  ],
    ":-\"":  [ "65.gif",          "whistling"                                   ],
    "b-(":   [ "66.gif",          "feeling beat up"                             ],
    ":)>-":  [ "67.gif",          "peace sign"                                  ],
    "[-X":   [ "68.gif",          "shame on you"                                ],
    "\\:D/": [ "69.gif",          "dancing"                                     ],
    ">:/":   [ "70.gif",          "bring it on"                                 ],
    ";))":   [ "71.gif",          "hee hee"                                     ],
    "o->":   [ "72.gif",          "hiro"                                        ],
    "o=>":   [ "73.gif",          "billy"                                       ],
    "o-+":   [ "74.gif",          "april"                                       ],
    "(%)":   [ "75.gif",          "yin yang"                                    ],
    ":-@":   [ "76.gif",          "chatterbox"                                  ],
    "^:)^":  [ "77.gif",          "not worthy"                                  ],
    ":-j":   [ "78.gif",          "oh go on"                                    ],
    "(*)":   [ "79.gif",          "star"                                        ],
    ":)]":   [ "100.gif",         "on the phone"                                ],
    ":-c":   [ "101.gif",         "call me"                                     ],
    "~X(":   [ "102.gif",         "at wits' end"                                ],
    ":-h":   [ "103.gif",         "wave"                                        ],
    ":-t":   [ "104.gif",         "time out"                                    ],
    "8->":   [ "105.gif",         "daydreaming"                                 ],
    ":-??":  [ "106.gif",         "I don't know"                                ],
    "%-(":   [ "107.gif",         "not listening"                               ],
    ":o3":   [ "108.gif",         "puppy dog eyes"                              ],
    "X_X":   [ "109.gif",         "I don't want to see",  "x_x"                 ],
    ":!!":   [ "110.gif",         "hurry up!"                                   ],
    "\\m/":  [ "111.gif",         "rock on!"                                    ],
    ":-q":   [ "112.gif",         "thumbs down"                                 ],
    ":-bd":  [ "113.gif",         "thumbs up"                                   ],
    "^#(^":  [ "114.gif",         "it wasn't me"                                ],
    ":bz":   [ "115.gif",         "bee"                                         ],
    ":ar!":  [ "pirate.gif",      "pirate"                                      ],
    "[..]":  [ "transformer.gif", "transformer"                                 ]
  }
};
//(function ($) {

jQuery(document).ready(function(){
	/*YUI().use('gallery-storage-lite', function (Y) {
	    Y.StorageLite.on('storage-lite:ready', function () {
	        if (drupalchat_getCookie('DRUPALCHAT_NEWLOGIN') != 1) {
	          if(Y.StorageLite.getItem('username')!=null) {
	        	drupalchat.username = Y.StorageLite.getItem('username');
	          }
	          if(Y.StorageLite.getItem('uid')!=null) {
	        	drupalchat.uid = Y.StorageLite.getItem('uid');
	          }
	          if(Y.StorageLite.getItem('send_current_message')!=null) {
	        	drupalchat.send_current_message = Y.StorageLite.getItem('send_current_message');
	          }	
	          if(Y.StorageLite.getItem('last_timestamp')!=null) {
	        	drupalchat.last_timestamp = Y.StorageLite.getItem('last_timestamp');
	          }
	          if(Y.StorageLite.getItem('send_current_uid2')!=null) {
	        	drupalchat.send_current_uid2 = Y.StorageLite.getItem('send_current_uid2');
	          }
	          if(Y.StorageLite.getItem('attach_messages_in_queue')!=null) {
	        	drupalchat.attach_messages_in_queue = Y.StorageLite.getItem('attach_messages_in_queue');
	          }
	          if(Y.StorageLite.getItem('running')!=null) {
	        	drupalchat.running = Y.StorageLite.getItem('running');
	          }
	          if(Y.StorageLite.getItem('drupalchat')!=null) {
	        	if(Y.StorageLite.getItem('drupalchat').length > 4) {
	        		jQuery('#drupalchat').html(Y.StorageLite.getItem('drupalchat'));
					if(Drupal.settings.drupalchat.polling_method == '2') {
					  jQuery('#chatpanel .subpanel ul').empty();
					  jQuery('#chatpanel .online-count').html(jQuery('#chatpanel .subpanel ul > li').size());
					}
	        	}
	          }
			  if((drupalchat.send_current_uid2!=null) && (jQuery("#chatbox_" + drupalchat.send_current_uid2 + " .chatboxcontent").length>0)) {
				jQuery("#chatbox_" + drupalchat.send_current_uid2 + " .chatboxcontent").scrollTop(jQuery("#chatbox_" + drupalchat.send_current_uid2 + " .chatboxcontent")[0].scrollHeight);
			  }
	        }
	        else {
	          drupalchat_setCookie('DRUPALCHAT_NEWLOGIN', 2, 0);
	        }

	    });

	});*/
	
	if (drupalchat_getCookie('DRUPALCHAT_NEWLOGIN') != 1) {
	          if(jQuery.drupalchatjStorage.get('username')!=null) {
	        	drupalchat.username = jQuery.drupalchatjStorage.get('username');
	          }
	          if(jQuery.drupalchatjStorage.get('uid')!=null) {
	        	drupalchat.uid = jQuery.drupalchatjStorage.get('uid');
	          }
	          if(jQuery.drupalchatjStorage.get('send_current_message')!=null) {
	        	drupalchat.send_current_message = jQuery.drupalchatjStorage.get('send_current_message');
	          }	
	          if(jQuery.drupalchatjStorage.get('last_timestamp')!=null) {
	        	drupalchat.last_timestamp = jQuery.drupalchatjStorage.get('last_timestamp');
	          }
	          if(jQuery.drupalchatjStorage.get('send_current_uid2')!=null) {
	        	drupalchat.send_current_uid2 = jQuery.drupalchatjStorage.get('send_current_uid2');
	          }
	          if(jQuery.drupalchatjStorage.get('attach_messages_in_queue')!=null) {
	        	drupalchat.attach_messages_in_queue = jQuery.drupalchatjStorage.get('attach_messages_in_queue');
	          }
	          if(jQuery.drupalchatjStorage.get('running')!=null) {
	        	drupalchat.running = jQuery.drupalchatjStorage.get('running');
	          }
	          if(jQuery.drupalchatjStorage.get('drupalchat')!=null) {
	        	if(jQuery.drupalchatjStorage.get('drupalchat').length > 4) {
	        		jQuery('#drupalchat').html(jQuery.drupalchatjStorage.get('drupalchat'));
					if(Drupal.settings.drupalchat.polling_method == '2') {
					  jQuery('#chatpanel .subpanel ul').empty();
					  jQuery('#chatpanel .online-count').html(jQuery('#chatpanel .subpanel ul > li').size());
					}
	        	}
	          }
			  if((drupalchat.send_current_uid2!=null) && (jQuery("#chatbox_" + drupalchat.send_current_uid2 + " .chatboxcontent").length>0)) {
				jQuery("#chatbox_" + drupalchat.send_current_uid2 + " .chatboxcontent").scrollTop(jQuery("#chatbox_" + drupalchat.send_current_uid2 + " .chatboxcontent")[0].scrollHeight);
			  }
	        }
	        else {
	          drupalchat_setCookie('DRUPALCHAT_NEWLOGIN', 2, 0);
	        }
	
	
	
	
	
	
	
	
	
	
	
	//Load smileys.
	emotify.emoticons( Drupal.settings.drupalchat.smileyURL, drupalchat.smilies );
	//Adjust panel height
	jQuery.fn.adjustPanel = function(){
	    jQuery(this).find("ul, .subpanel").css({ 'height' : 'auto'}); //Reset sub-panel and ul height
	
	    var windowHeight = jQuery(window).height(); //Get the height of the browser viewport
	    var panelsub = jQuery(this).find(".subpanel").height(); //Get the height of sub-panel
	    var panelAdjust = windowHeight - 100; //Viewport height - 100px (Sets max height of sub-panel)
	    var ulAdjust =  panelAdjust - 25; //Calculate ul size after adjusting sub-panel
	
	    if (panelsub > panelAdjust) {	 //If sub-panel is taller than max height...
	        jQuery(this).find(".subpanel").css({ 'height' : panelAdjust}); //Adjust sub-panel to max height
	        jQuery(this).find("ul").css({ 'height' : (panelAdjust - 48)}); ////Adjust subpanel ul to new size
	    }
	    else { //If sub-panel is smaller than max height...
	    	jQuery(this).find("ul").css({ 'height' : 'auto'}); //Set sub-panel ul to auto (default size)
	    }
	};
	
	//Execute function on load
	jQuery("#chatpanel").adjustPanel(); //Run the adjustPanel function on #chatpanel
	
	//Each time the viewport is adjusted/resized, execute the function
	jQuery(window).resize(function () {
	    jQuery("#chatpanel").adjustPanel();
	});
	
	//Add sound effect SWF file to document
	jQuery("<div style=\"width: 0px; height: 0px; overflow: hidden;\"><object id=\"drupalchatbeep\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"1\" height=\"1\"><param name=\"movie\" value=\"" + Drupal.settings.drupalchat.sound + "\"/><!--[if !IE]>--><object type=\"application/x-shockwave-flash\" data=\"" + Drupal.settings.drupalchat.sound + "\" width=\"1\" height=\"1\"></object><!--<![endif]--></object></div>").appendTo(jQuery("body"));
	swfobject.registerObject("drupalchatbeep", "9");
	
	//Click event on subpanels	
	jQuery("#mainpanel li a.subpanel_toggle, .chatbox a.chatboxhead").live('click', function() { //If clicked on the first link of #chatpanel...
	    if(jQuery(this).next(".subpanel").is(':visible')){ //If subpanel is already active...
	        jQuery(this).next(".subpanel").hide(); //Hide active subpanel
	        //jQuery("#drupalchat li a").removeClass('active'); //Remove active class on the subpanel trigger
			jQuery(this).removeClass('active');
	    }
	    else { //if subpanel is not active...
	        //jQuery(".subpanel").hide(); //Hide all subpanels
	        jQuery(this).next(".subpanel").toggle(); //Toggle the subpanel to make active
	        //jQuery("#drupalchat li a").removeClass('active'); //Remove active class on all subpanel trigger
	        jQuery(this).removeClass('active');
			jQuery(this).toggleClass('active'); //Toggle the active class on the subpanel trigger
	        // Chat box functions
	        var isTextarea = jQuery(this).next(".subpanel").children(".chatboxinput").children(".chatboxtextarea");
	        if (isTextarea.length > 0) { 
	        	isTextarea[0].focus();
	        	jQuery(this).next(".subpanel").children(".chatboxcontent").scrollTop(jQuery(this).next(".subpanel").children(".chatboxcontent")[0].scrollHeight);
	        }
	    }
		jQuery('#drupalchat-chat-options').hide();
	    return false; //Prevent browser jump to link anchor
	});
		
	jQuery('.subpanel .subpanel_title').live('click', function() { //Click anywhere and...
	    //jQuery(".subpanel").hide(); //hide subpanel
		jQuery(this).parent().hide(); //hide subpanel
	    //jQuery("#drupalchat li a").removeClass('active'); //remove active class on subpanel trigger
		jQuery(this).parent().parent().children('a').removeClass('active');
	});	
	jQuery('#drupalchat .subpanel .subpanel_title span.options').live('click', function() { //Click anywhere and...
		var offset = jQuery(this).offset();
		offset.top = offset.top + 20;
		offset.left = offset.left - 50;
		if (jQuery('#drupalchat-chat-options').is(":hidden")) {
		  jQuery('#drupalchat-chat-options').show();
		}
		else {
		  jQuery('#drupalchat-chat-options').hide();
		}
		jQuery('#drupalchat-chat-options').offset({top: offset.top, left: offset.left});
		return false;
	});
	jQuery('#drupalchat-chat-options-s').live('click', function(e) {
	  if(jQuery(this).html() == '<a href="#">Mute</a>') {
	    jQuery(this).html('<a href="#">Unmute</a>');
		Drupal.settings.drupalchat.notificationSound = '2';
	  }
	  else {
	    jQuery(this).html('<a href="#">Mute</a>');
		Drupal.settings.drupalchat.notificationSound = '1';
	  }
	  jQuery('#drupalchat-chat-options').hide();
	  return false;
	});
	jQuery('body').live('click', function() {
	  jQuery('#drupalchat-chat-options').hide();
	});
	
	jQuery('.subpanel ul').click(function(e) {
//	    e.stopPropagation(); //Prevents the subpanel ul from closing on click
	});

	jQuery("#chatpanel .subpanel li:not(.link) a").live('click', function() {
            chatWith(jQuery(this).attr("class"), jQuery(this).text());
			return false;
	});	
	
	jQuery(".chatbox .subpanel_title span:not(.min)").live('click', function () {
		closeChatBox(jQuery(this).attr('class'));
	});
	//alert(Drupal.settings.drupalchat.status);
	if (Drupal.settings.drupalchat.status == 1) {
            jQuery(".chat_options .chat_loading").removeClass('chat_loading').addClass('status-2').html(Drupal.settings.drupalchat.goIdle);
            jQuery("#chatpanel .icon").attr("src", Drupal.settings.drupalchat.images + "chat-1.png");
	}
	else if (Drupal.settings.drupalchat.status == 2) {
            jQuery(".chat_options .chat_loading").removeClass('chat_loading').addClass('status-1').html(Drupal.settings.drupalchat.goOnline);
            jQuery("#chatpanel .icon").attr("src", Drupal.settings.drupalchat.images + "chat-2.png");
	}
		
	jQuery(".chat_options .status-1").live('click', function() {
            jQuery(".chat_options .status-1").removeClass('status-1').addClass('chat_loading');
            jQuery.post(Drupal.settings.drupalchat.statusUrl, {status: "1"}, function(data){
                jQuery(".chat_options .chat_loading").removeClass('chat_loading').addClass('status-2').html(Drupal.settings.drupalchat.goIdle);
                jQuery("#chatpanel .icon").attr("src", Drupal.settings.drupalchat.images + "chat-1.png");
            });
	});
	jQuery(".chat_options .status-2").live('click', function() {
            jQuery(".chat_options .status-2").removeClass('status-2').addClass('chat_loading');
            jQuery.post(Drupal.settings.drupalchat.statusUrl, {status: "2"}, function(data){
                jQuery(".chat_options .chat_loading").removeClass('chat_loading').addClass('status-1').html(Drupal.settings.drupalchat.goOnline);
                jQuery("#chatpanel .icon").attr("src", Drupal.settings.drupalchat.images + "chat-2.png");
            });
	});	
	
	jQuery(".chat_options .options").live('click', function() {
            alert('Under Construction');
	});
  
	// Add short delay before first poll call. This avoids Chrome loading-icon bug. 
  setTimeout(function () {
    chatPoll();
  }, 500); 
  jQuery('#drupalchat .subpanel .chatboxcontent').live('mouseenter', function() {
    jQuery(this).css("overflow-y","auto");
	//document.body.style.overflow='hidden';
  });
  jQuery('#drupalchat .subpanel .chatboxcontent').live('mouseleave', function() {
    jQuery(this).css("overflow-y","hidden");
	//document.body.style.overflow='auto';
  });
});


function chatWith(chatboxtitle, chatboxname) {
    createChatBox(chatboxtitle, chatboxname);
    jQuery("#chatbox_"+chatboxtitle+" a:first").click(); //Toggle the subpanel to make active
    jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
}


function createChatBox(chatboxtitle, chatboxname, chatboxblink) {
    if (jQuery("#chatbox_"+chatboxtitle).length > 0) {
        if (jQuery("#chatbox_"+chatboxtitle).css('display') == 'none') {
            jQuery("#chatbox_"+chatboxtitle).css('display', 'block');
        }
        jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
        return;
    }

    jQuery(" <li />" ).attr("id","chatbox_"+chatboxtitle)
    .addClass("chatbox")
    .html('<a href="#" class="chatboxhead"><span class="subpanel_title_text">'+chatboxname+'</span></a><div class="subpanel"><div class="subpanel_title"><span class="'+chatboxtitle+'" title="Close">x</span><span title = "Minimize" class="min">_</span><div class="status-1"></div>'+chatboxname+'</div><div class="chatboxcontent"></div><div class="drupalchat_userOffline">'+chatboxname+' is currently offline.</div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="return Drupal.drupalchat.checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');"></textarea></div></div>')
    .prependTo(jQuery( "#mainpanel" ));

    if (chatboxblink == 1) {
        jQuery('#chatbox_'+chatboxtitle+' .chatboxhead').addClass("chatboxblink");
    }

    jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
        jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
    }).focus(function(){
        jQuery('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('chatboxblink');
        jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
    });

    jQuery("#chatbox_"+chatboxtitle).click(function() {
        if (jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') != 'none') {
            jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
        }
    });
    jQuery("#chatbox_"+chatboxtitle).show();
}

function chatPoll() {
    if(Drupal.settings.drupalchat.polling_method == '0') {
	  setTimeout(function() {
        jQuery.getJSON(Drupal.settings.drupalchat.pollUrl, { drupalchat_last_timestamp: drupalchat.last_timestamp }, function(data) {
          processChatData(data);
        });
        /*setInterval(function() {
            jQuery.getJSON(Drupal.settings.drupalchat.pollUrl, { drupalchat_last_timestamp: drupalchat.last_timestamp }, function(data) {
                processChatData(data);
            });*/
            /*jQuery.post(Drupal.settings.drupalchat.pollUrl,
                {
                    drupalchat_last_timestamp: drupalchat.last_timestamp
                },
                processChatData
            );*/
      }, (Drupal.settings.drupalchat.refresh_rate) * 1000);
    }
    else if(Drupal.settings.drupalchat.polling_method == '1') {
        jQuery.getJSON(Drupal.settings.drupalchat.pollUrl, { drupalchat_last_timestamp: drupalchat.last_timestamp }, function(data) {
            processChatData(data);
        });
        /*jQuery.post(Drupal.settings.drupalchat.pollUrl,
            {
                drupalchat_last_timestamp: drupalchat.last_timestamp
            },
            processChatData
        );*/
    }
}

function processChatData(data) {
    var drupalchat_messages = data;
	//var drupalchat_messages = jQuery.getJSON(data);
        if((!drupalchat_messages.status || drupalchat_messages.status == 0)) {
		if (drupalchat_messages.messages.length > 0) {
			// Play new message sound effect
			var obj = swfobject.getObjectById("drupalchatbeep");
			if (obj && Drupal.settings.drupalchat.notificationSound === "1") {
			  try {
			    obj.drupalchatbeep(); // e.g. an external interface call
		      }
			  catch(e) {
			  }
			}			
		}
		jQuery.each(drupalchat_messages.messages, function(index, value) {
		    var drupalselfmessage = false;
			if(value.uid1 == Drupal.settings.drupalchat.uid) {
			  drupalselfmessage = true;
			}
			//Add div if required.
			if(value.uid2=="c-0") {
			  drupalchatroom = true;
			}
            else {
			  drupalchatroom = false;
            }			
			chatboxtitle = (drupalchatroom || drupalselfmessage)?value.uid2:value.uid1;
			if (jQuery("#chatbox_"+chatboxtitle).length <= 0) {
				createChatBox(chatboxtitle, drupalchatroom?"Public Chatroom":value.name, 1);
			}
			else if (jQuery("#chatbox_"+chatboxtitle+" .subpanel").is(':hidden')) {
				if (jQuery("#chatbox_"+chatboxtitle).css('display') == 'none') {
					jQuery("#chatbox_"+chatboxtitle).css('display','block');
				}
				jQuery('#chatbox_'+chatboxtitle+' .chatboxhead').addClass("chatboxblink");
				jQuery('#chatbox_'+chatboxtitle+' .chatboxhead').live('click', function() {
				  jQuery('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass("chatboxblink");
				  drupalchat.send_current_uid2 = chatboxtitle;
				});
				//jQuery("#chatbox_"+chatboxtitle+" a:first").click(); //Toggle the subpanel to make active
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
			}
            if(value.uid1 == Drupal.settings.drupalchat.uid) {
              value.name = Drupal.settings.drupalchat.username;  
            }
			if(jQuery("."+value.message_id)[0]){
			  return;
            }			  
			value.message = value.message.replace(/{{drupalchat_newline}}/g,"<br />");
			value.message = emotify(value.message);
			if (jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent .chatboxusername a:last").html() == value.name) {
				jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<p class="' + value.message_id + '">'+value.message+'</p>');
			}
			else {
				var currentTime = new Date();
				var hours = currentTime.getHours();
				var minutes = currentTime.getMinutes();
				if (hours < 10) {
					hours = "0" + hours;
				}
				if (minutes < 10) {
					minutes = "0" + minutes;
				}				
				jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxusername"><span class="chatboxtime">'+hours+':'+minutes+'</span><a href="'+Drupal.settings.basePath+'user/'+value.uid1+'">'+value.name+'</a></div><p class="' + value.message_id + '">'+value.message+'</p>');
			}
			jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop(jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
			
                        jQuery.titleAlert(Drupal.settings.drupalchat.newMessage, {requireBlur:true, stopOnFocus:true, interval:800});
		});
		
	  jQuery('#chatpanel .subpanel ul').empty();
	  jQuery('li[id^="chatbox_"]').each(function(){
	    Drupal.drupalchat.changeStatus(this.id,0);
	  });
	  jQuery.each(drupalchat_messages.buddylist, function(key, value) {
		  if (key != 'total') {
			  if (key != Drupal.settings.drupalchat.uid) {
			  	jQuery('#chatpanel .subpanel ul').append('<li class="status-' + value.status + '"><a class="' + key + '" href="#">' + value.name + '</a></li>');
			    Drupal.drupalchat.changeStatus('chatbox_'+key,1);
			  }
		  }
		  else {
			  jQuery('#chatpanel .online-count').html(value);
			  if(value == 0) {
			    jQuery('#chatpanel .subpanel ul').append(Drupal.settings.drupalchat.noUsers);
			  }
		  }
		});
	  jQuery('#chatpanel .subpanel ul li:last-child').addClass('last');
	  
	  /*if (jQuery('#chatpanel .subpanel ul li').length <= 0) {
	  	jQuery('#chatpanel .subpanel ul').append(Drupal.settings.drupalchat.noUsers);
	  }*/
	  
	  //Update Timestamp.
	  drupalchat.last_timestamp = drupalchat_messages.last_timestamp;  
	}
	//if (Drupal.settings.drupalchat.polling_method != '0') {
		chatPoll();
	//}
}

function closeChatBox(chatboxtitle) {
	jQuery('#chatbox_'+chatboxtitle).css('display','none');
}


	

jQuery(window).unload(function(){
  jQuery('.chatbox .chatboxhead').removeClass("chatboxblink");
	/*YUI().use('gallery-storage-lite', function (Y) {
	    Y.StorageLite.on('storage-lite:ready', function () {
	    	Y.StorageLite.setItem('username', drupalchat.username);
	    	Y.StorageLite.setItem('uid', drupalchat.uid);
	    	Y.StorageLite.setItem('send_current_message', drupalchat.send_current_message);
	    	Y.StorageLite.setItem('last_timestamp', drupalchat.last_timestamp);
	    	Y.StorageLite.setItem('send_current_uid2', drupalchat.send_current_uid2);
	    	Y.StorageLite.setItem('attach_messages_in_queue', drupalchat.attach_messages_in_queue);
	    	Y.StorageLite.setItem('running', drupalchat.running);
	    	//alert(jQuery('#drupalchat').html());
	    	Y.StorageLite.setItem('drupalchat', jQuery('#drupalchat').html());
	        });
	    });
    */
  jQuery.drupalchatjStorage.set('username', drupalchat.username);
  jQuery.drupalchatjStorage.set('uid', drupalchat.uid);
  jQuery.drupalchatjStorage.set('send_current_message', drupalchat.send_current_message);
  jQuery.drupalchatjStorage.set('last_timestamp', drupalchat.last_timestamp);
  jQuery.drupalchatjStorage.set('send_current_uid2', drupalchat.send_current_uid2);
  jQuery.drupalchatjStorage.set('attach_messages_in_queue', drupalchat.attach_messages_in_queue);
  jQuery.drupalchatjStorage.set('running', drupalchat.running);
  //alert(jQuery('#drupalchat').html());
  jQuery.drupalchatjStorage.set('drupalchat', jQuery('#drupalchat').html());	

});
function drupalchat_getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
function drupalchat_setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
//})(jQuery);
;
/**
 * Has been modified.
 */
/*!
 * JavaScript Emotify - v0.6 - 11/17/2009
 * http://benalman.com/projects/javascript-emotify/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: JavaScript Emotify: Making the web a better place, one tiny image at a time
//
// *Version: 0.6, Last updated: 11/17/2009*
// 
// Project Home - http://benalman.com/projects/javascript-emotify/
// GitHub       - http://github.com/cowboy/javascript-emotify/
// Source       - http://github.com/cowboy/javascript-emotify/raw/master/ba-emotify.js
// (Minified)   - http://github.com/cowboy/javascript-emotify/raw/master/ba-emotify.min.js (1.1kb)
// 
// About: License
// 
// Copyright (c) 2009 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Basic Emotification - http://benalman.com/code/projects/javascript-emotify/examples/emotify/
// Adium Emoticonsets  - http://benalman.com/code/projects/javascript-emotify/examples/adium-emoticonset/
// 
// About: Support and Testing
// 
// Information about what browsers this code has been tested in.
// 
// Browsers Tested - Internet Explorer 6-8, Firefox 3-3.5, Safari 3-4, Chrome, Opera 9.6-10.
// 
// About: Release History
// 
// 0.6 - (11/17/2009) Minor tweaks and bugfixes
// 0.5 - (8/17/2009) Initial release

window.emotify = (function(){
  var emotify,
    EMOTICON_RE,
    emoticons = {},
    lookup = [];
  
  // Function: emotify
  // 
  // Turn text into emotified html. You know, like, with smileys.
  // 
  // Usage:
  // 
  //  > var html = emotify( text [, callback ] );
  // 
  // Arguments:
  // 
  //  text - (String) Non-HTML text containing emoticons to be parsed.
  //  callback - (Function) If specified, this will be called once for each
  //    emoticon with four arguments: img, title, smiley and text. The img and
  //    title arguments are the matched emoticon's stored image url and title
  //    text. The smiley argument is the primary smiley, and the text argument
  //    is the original text that was replaced. If unspecified, the default
  //    emotification function is used.
  // 
  // Returns:
  // 
  //  (String) An HTML string containing inline emoticon image HTML.
  
  emotify = function( txt, callback ) {
    callback = callback || function( img, title, smiley, text ) {
      title = ( title + ', ' + smiley ).replace( /"/g, '&quot;' ).replace( /</g, '&lt;' );
      return '<img src="' + img + '" title="' + title + '" alt="" class="smiley"/>';
    };
    
    return txt.replace( EMOTICON_RE, function( a, b, text ) {
      var i = 0,
        smiley = text,
        e = emoticons[ text ];
      
      // If smiley matches on manual regexp, reverse-lookup the smiley.
      if ( !e ) {
        while ( i < lookup.length && !lookup[ i ].regexp.test( text ) ) { i++; };
        smiley = lookup[ i ].name;
        e = emoticons[ smiley ];
      }
      
      // If the smiley was found, return HTML, otherwise the original search string
      return e ? ( b + callback( e[ 0 ], e[ 1 ], smiley, text ) ) : a;
    });
  };
  
  // Method: emotify.emoticons
  // 
  // By default, no emoticons are registered with <emotify>. This method allows
  // you to add one or more emoticons for future emotify parsing.
  // 
  // Usage:
  // 
  //  > emotify.emoticons( [ base_url, ] [ replace_all, ] [ smilies ] );
  // 
  // Arguments:
  // 
  // base_url (String) - An optional string to prepend to all image urls.
  // replace_all (Boolean) - By default, added smileys only overwrite existing
  //   smileys with the same key, leaving the rest. Set this to true to first
  //   remove all existing smileys before adding the new smileys.
  // smilies (Object) - An object containing all the smileys to be added. If
  //   smilies is omitted, the method does nothing but return the current
  //   internal smilies object.
  // 
  // Returns:
  // 
  //  (Object) The internal smilies object. Do not modify this object directly,
  //  use the emotify.emoticons method instead.
  // 
  // A sample emotify.emoticons call and smilies object:
  // 
  //  > emotify.emoticons( "/path/to/images/", {
  //  > 
  //  >   // "smiley": [ image_url, title_text [, alt_smiley ... ] ]
  //  > 
  //  >   ":-)": [ "happy.gif", "happy" ],
  //  >   ":-(": [ "sad.gif", "sad", ":(", "=(", "=-(" ]
  //  > });
  // 
  // In the above example, the happy.gif image would be used to replace all
  // occurrences of :-) in the input text. The callback would be called with the
  // arguments "happy.gif", "happy", ":-)", ":-)" and would generate this html
  // by default: <img src="happy.gif" title="happy, :-)" alt="" class="smiley"/>
  // 
  // The sad.gif image would be used to replace not just :-( in the input text,
  // but also :( and :^(. If the text =( was matched, the callback would be called
  // with the arguments "sad.gif", "sad", ":-(", "=(" and would generate this
  // html by default: <img src="sad.gif" title="sad, :-(" alt="" class="smiley"/>
  // 
  // Visit this URL for a much more tangible example.
  // 
  // http://benalman.com/code/projects/javascript-emotify/examples/emotify/
  
  emotify.emoticons = function() {
    var args = Array.prototype.slice.call( arguments ),
      base_url = typeof args[0] === 'string' ? args.shift() : '',
      replace_all = typeof args[0] === 'boolean' ? args.shift() : false,
      smilies = args[0],
      
      e,
      arr = [],
      alts,
      i,
      regexp_str;
    
    if ( smilies ) {
      
      if ( replace_all ) {
        emoticons = {};
        lookup = [];
      }
      
      for ( e in smilies ) {
        emoticons[ e ] = smilies[ e ];
        emoticons[ e ][ 0 ] = base_url + emoticons[ e ][ 0 ];
      }
      
      // Generate the smiley-match regexp.
      for ( e in emoticons ) {
        
        if ( emoticons[ e ].length > 2 ) {
          // Generate regexp from smiley and alternates.
          alts = emoticons[ e ].slice( 2 ).concat( e );
          
          i = alts.length;
          while ( i-- ) {
        	  if ( typeof( alts[i] ) != 'undefined' )
        	  alts[i] = alts[i].replace( /(\W)/g, '\\$1' );
          }
          
          regexp_str = alts.join( '|' );
          
          // Manual regexp, map regexp back to smiley so we can reverse-match.
          lookup.push({ name: e, regexp: new RegExp( '^' + regexp_str + '$' ) });
          
        } else {
          // Generate regexp from smiley.
          regexp_str = e.replace( /(\W)/g, '\\$1' );
        }
        
        arr.push( regexp_str );
      }
      
      EMOTICON_RE = new RegExp( '(^|\\s)(' + arr.join('|') + ')(?=(?:$|\\s))', 'g' );
    }
    
    return emoticons;
  };
  
  return emotify;
  
})();;
