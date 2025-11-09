---description: Implementing the vortex math using javascript.
pubDate: 2022-02-24 00:00:00-05:00
title: Vortex Math
---

Mathologer made a really neat video on Vortex Math and proposed to implement one as a coding challenge [in his video](https://www.youtube.com/embed/6ZrO90AI0c8?start=1097)

Here is my implementation... Enjoy!

<script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js"></script>

<div id="sketchHolder"></div>

<div style="margin-top: 20px;">
    <div>
        <label for="modulus-slider">Modulus: </label>
        <input type="text" id="modulus-text" placeholder="111" value="111" size="5"
            onchange="updateModulus(this.value); draw();">
        <input type="range" min="2" max="300" step="1.0" id="modulus-slider"
            value="111" oninput="updateModulus(this.value); draw();">
    </div>
    <div style="margin-top: 10px;">
        <label for="multiplier-slider">Multiplier: </label>
        <input type="text" id="multiplier-text" placeholder="2" value="2" size="5"
            onchange="updateMultiplier(this.value); draw();">
        <input type="range" min="2" max="20" step="1.0" id="multiplier-slider"
            value="2" oninput="updateMultiplier(this.value); draw();">
    </div>
</div>

<script src="/vortexmath.js"></script>
