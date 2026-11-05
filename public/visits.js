/* عدّاد الزوار: الإجمالي والمتصفحون الآن (نبضة كل 30 ثانية والصفحة ظاهرة) */
(function () {
  var box = document.getElementById("visits"); if (!box) return;
  var id; try { id = localStorage.getItem("rafiq-vid"); if (!id) { id = (Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).replace(/[^a-z0-9]/g, "").slice(0, 32); localStorage.setItem("rafiq-vid", id); } } catch (e) { id = "anon" + Math.random().toString(36).slice(2, 18); }
  var fmt = function (n) { try { return Number(n).toLocaleString("ar-SA"); } catch (e) { return String(n); } };
  function ping() {
    if (document.visibilityState === "hidden") return;
    fetch("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { document.getElementById("v-total").textContent = fmt(j.total); document.getElementById("v-online").textContent = fmt(j.online); box.hidden = false; })
      .catch(function () { });
  }
  ping(); setInterval(ping, 30000);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") ping(); });
})();
