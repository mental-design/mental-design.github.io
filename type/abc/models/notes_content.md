All Birds Combination (ABC) is a loosely grid-based modular display typeface that is a reinterpretation of Josef Albersʼ Kombinations-schrift.

Kombinations-schrift was created using 10 different stencil shapes. The shapes were systematically created using squares and quarter circles. The resulting letters were systematic and modular making it a good typeface to analyze.

<!-- ![Albersʼ Kombinations-schrift](resources/images/JosefAlbersKombinationsschrift.png "Albersʼ Kombinations-schrift") -->

For ABC, we initially split the glyphs into the atomic components - squares, quarter circles, and circles. This  results in a 3 x 2 grid for minuscules and numerics and a 4 x 2 grid for majescules. Each grid cell can be represented by a number that maps to a component type - square, quarter circle , or circle. In turn, each glyph can be encoded into an array of numbers. 
 
![Encoding glyph a](resources/images/decoding.png "Encoding glyph a")

We then implemented a decoder that takes the array of numbers and recreates the original glyph.
But we didn't stop there. With the decoder in place, we could now adjust the glyphs by simply changing numbers. Furthermore, new components could be added as needed.

### LICENSE
All Birds Combination is licensed under the [SIL Open Font License][1]. It is free for personal and commercial use. Send us an email (type@mentallydesigned.com) to share how you used the typeface. Have fun!

[1]: downloads/License.txt