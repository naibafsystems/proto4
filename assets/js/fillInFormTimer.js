var timer=new Date,horaIni=new Date(timer.getFullYear(),timer.getMonth(),timer.getDate(),timer.getHours(),timer.getMinutes(),timer.getSeconds()),horaFin=null;$(function(){function e(){var e=new Date;horaFin=new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds())}window.setInterval(e,1e3)});var duracionPagina=function(){var e=horaFin-horaIni,t=e,r=Math.floor(t/1e3/60/60);t-=1e3*r*60*60;var n=Math.floor(t/1e3/60);t-=1e3*n*60;var a=Math.floor(t/1e3);return t-=1e3*a,r+":"+n+":"+a};