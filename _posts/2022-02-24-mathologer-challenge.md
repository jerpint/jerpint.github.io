---
title: "Vortex Math"
date: 2022-02-24T00:00:00-05:00
excerpt: "Implementing the vortex math using javascript."
categories:
  - blog
tags:
  - javascript
  - p5
header:
  og_image: /assets/images/vortex.png
---

Mathologer made a really neat video on Vortex Math and proposed to implement one as a coding challenge [in his video](https://www.youtube.com/embed/6ZrO90AI0c8?start=1097)

Here is my implementation... Enjoy!

<!-- <iframe src="https://editor.p5js.org/jerpint/full/ta-N2RUpz"></iframe> -->
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js"></script>
    <script src="/assets/vortexmath.js"></script>
  </head>

<body>
    <div class="container">
        <div class="row flex-row justify-content-center">
            <div class="col-sm-8 col-lg-6 border border-dark">
                <label for="modulus-slider" class="form-label text-center">Modulus</label>
                <div class="row border border-success">
                    <div class="col-2">
                        <input type="text" class="texwt-input w-100" id="modulus-text" placeholder="111" value="111"
                            onchange="updateModulus(this.value); draw();">
                    </div>
                    <div class="col-8">
                        <input type="range" class="form-range" min="2" max="300" step="1.0" id="modulus-slider"
                            value="111" oninput="updateModulus(this.value); draw();">
                    </div>
                </div>

                <label for="multiplier-slider" class="form-label text-center">Multiplier</label>
                <div class="row border border-success">
                    <div class="col-2">
                        <input type="text" class="text-input w-100" id="multiplier-text" placeholder="2" value="2"
                            onchange="updateMultiplier(this.value); draw();">
                    </div>
                    <div class="col-8">
                        <input type="range" class="form-range" min="1" max="200" step="1.0" id="multiplier-slider"
                            value="2" oninput="updateMultiplier(this.value); draw();">
                    </div>
                </div>

            </div>

            <div class="col-8 col-s-6 col-md-4 col-lg-6 ">
                <div id="sketchHolder" class="border border-4 border-dark">
                </div>
            </div>


        </div>

    </div>

</body>
</html>
