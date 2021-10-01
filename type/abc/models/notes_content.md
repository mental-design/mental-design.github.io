All Birds Combinations (ABC) is a modular display typeface with 7 levels of compressed weights. ABC is a reinterpretation of Josef Albersʼ Kombinations-Schrift, where the name is also derived from.
Whereas Kombinations-Schrift is a product of the age of mass production, ABC was designed as a product of the information age.

For ABC, each glyph is represented by an array of numbers (encodings) which is decoded using custom code to create the contours. This approach allows us to explore a design space defined by the decoder in which we could further refine the shape of each glyph. 
While the basic structure was formed by Kombinations-Schrift, each glyph was refined with influences from neoclassical typefaces like Bodoni and Didot to make the typeface feel more natural and balanced.

By extending the functionality of the decoder, we could expand the design space to handle shapes that were hard to represent previously. Compressed weights could be created by defining how to decode the encodings for tall rectangular spaces. This systematic approach makes the changes between the weights smooth and continuous, allowing for natural transition different weights like the examples below. (For more details, click on the details button below the examples.)

<div id="wave" class="abc"></div>

<div id="details-wrapper">
<div id="details-btn" onclick="showDetails()">
    <i id="details-icon" class="fa fa-plus-circle"> </i> Details
</div>

<!-- Details! -->
<div id="details" class="section-light-grey" hidden>
<div class="sample-font ten-parts">   </div>

Albersʼ Kombinations-schrift was created for the age of industry and mass production. The typeface was created by combining the 10 shapes above—which could be mass produced in glass, plastic, metal or wood—and could be easily assembled anywhere.

<div class="sample-font three-parts"><span style="letter-spacing: -3px"></span></div>

For ABC, we wanted to translate Kombinations-Schrift into a typeface of the information age, a product of data, algorithms, and software programming. The key insight was to encode each glyph into an array of numbers (encodings) based on the basic shapes used to create it—square, circle, and quarter circle. We then implemented a decoder program that could take the encodings and create a font.

<img src="resources/images/encodings.png" width="480"/>

With the decoder in place, modifying a glyph was just a matter of changing numbers. Whereas Kombinations-Schrift has a Fraktur like quality, each glyph in ABC was revised to resemble neoclassical type, such as Didot or Bodoni. ABC has strong verticals similar to the strongly vertical and high contrast Didone typefaces which made them a good reference for refinement.

<div id="image-player"></div>

The design space of the typeface could be extended by adding new functionality to the decoder. New parts, such as semi-circles for rings and triangles for bird beaks, were added as needed. A quarter-sized square components was added for currency glyphs, giving them a distinct impression compared to other glyphs.
Compressed weights could be created systematically by defining how to decode each number for tall rectangular spaces. This systematic approach makes the changes between the weights smooth and continuous, allowing for seamless mix-and-matching of different weights.

</div>
<!-- Details End -->
</div>

### LICENSE
All Birds Combinations is licensed under the [SIL Open Font License][1]. It is free for personal and commercial use. Send us an email (type@mentallydesigned.com) to share how you used the typeface. Have fun!

[1]: downloads/License.txt