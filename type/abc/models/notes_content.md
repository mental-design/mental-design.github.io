<strong>All Birds Combinations (ABC)</strong> is a modular display typeface with <strong>7 levels of compressed weights</strong>. ABC is a reinterpretation of Josef Albersʼ Kombinations-Schrift, from which the name, All Birds Combinations, is also derived.
Whereas Kombinations-Schrift is a typeface of the age of mass production, ABC was designed as a product of the information age.

Each glyph in ABC is represented by an array of numbers (encodings) which is decoded using custom code to create the contours. This approach allows us to explore a design space defined by the decoder in which we could further refine the shape of each glyph. 
While the basic structure was formed by Kombinations-Schrift, each glyph was refined with influences from neoclassical typefaces to make the typeface feel more natural and balanced.

Furthermore, we modified the decoder to systematically create compressed weights. This structured approach enables fluid transitions between different weights, even within the same line, as is demonstrated by the examples below.

<div id="wave" class="abc"></div>

Click the Details button below for more information about the typeface.

<div id="details-wrapper">
<div id="details-btn" onclick="showDetails()">
    <i id="details-icon" class="fa fa-plus-circle"> </i> Details
</div>

<!-- Details! -->
<div id="details" class="section-light-grey" hidden>
<div id="ten-parts" class="sample-font">   </div>

Albersʼ Kombinations-schrift is a typeface that was created for an age of industry and mass production. The typeface was constructed by combining the 10 shapes above which could be mass produced in glass, plastic, metal or wood and easily assembled anywhere.

<div id="three-wrapper" class="sample-font">
    <div id="three-parts">
        <span style="letter-spacing: -3px"></span>
    </div>
</div>

For ABC, we wanted to translate Kombinations-Schrift into a typeface of the information age—a product of data, algorithms, and software programming. The main idea was to represent each glyph as an array of numbers, namely itʼs encoding, based on the basic shapes used to create it—square, circle, and quarter circle. We then implemented a decoder program that could take the encodings and create a font.

<img src="resources/images/encodings.png" width="480"/>

The diagram above shows the encoding process for glyph <strong>a</strong>. First, the glyph is divided into square sections. Then using the map on the left, each section can be assigned a number. These numbers are then arranged into an array, which we call itʼs <strong>encoding</strong>. The encodings are saved in a file. This file contains the information needed to create the font.

To create a font, the encodings are <strong>decoded</strong> by applying the reverse process. For each glyph, the decoder takes the encoding, looks up the map for each section, and then draws the corresponding shape. These sections are then merged to form the final glyph.

<div id="image-player"></div>

With the decoder in place, modifying a glyph was just a matter of changing numbers in the encodings. Each glyph was revised and adjusted to give the typeface a more balanced and natural appearance. Neoclassical typefaces like Bodoni and Didot, with their strong verticals and high contrast, were used as references for the design refinements.

By extending the functionality of the decoder, we could expand the design space to handle glyphs that were hard to represent previously. New components, such as semi-circles for rings and triangles for bird beaks, were added as needed. A quarter-sized square component was added for currency glyphs, giving them a distinct appearance compared to other glyphs.

<div id="a-weights" class="abc">
    <span style="font-weight:700">a</span>
    <span style="font-weight:600">a</span>
    <span style="font-weight:500">a</span>
    <span style="font-weight:400">a</span>
    <span style="font-weight:300">a</span>
    <span style="font-weight:200">a</span>
    <span style="font-weight:100">a</span>
</div>

By defining how to decode tall rectangular sections, compressed weights could be generated from the existing encodings. This systematic approach makes changes between weights smooth and continuous.

</div>
<!-- Details End -->
</div>

### LICENSE
All Birds Combinations is licensed under the [SIL Open Font License][1]. It is free for personal and commercial use. Send us an email (type@mentallydesigned.com) to share how you used the typeface. Have fun!

[1]: downloads/License.txt