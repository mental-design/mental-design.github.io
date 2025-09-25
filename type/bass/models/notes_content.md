<strong>Basically A Sans Serif (BASS)</strong> is a monolinear geometric sans serif typeface primarily intended for display use. BASS comes in <strong>9 weights</strong> from <thin>THIN</thin> to <thick>THICK</thick>. (<extrabold>ExtraBold</extrabold> and <thick>THICK</thick> are now official!)

BASS is the proportional version of <a href="../bam/" class="bam">Basically A Mono</a> (BAM). Following the same principles as BAM, each glyph in BASS is constructed from lines, circular arcs, and elliptical arcs when necessary. In version 2, each glyph was revised to handle stroke contrast and additional components were introduced to improve typographic color.

BASS supports several OpenType features including <b>SmallCaps(<code>smcp</code>)</b>, <b>Unicase(<code>unic</code>)</b>, <b>Tabular Numerics(<code>tnum</code>)</b>, <b>Fractions(<code>frac</code>)</b>, and <b>3 Stylistic Sets (<code>ss01</code>/<code>ss02</code>/<code>ss03</code>)</b>, providing multiple stylistic options that allow for greater control and customization in your designs.

With the new features introduced in version 2, BASS has evolved from a simple typeface to a versatile typographic toolkit, ideal for your next geometric graphic design project.

Click the Details button below to discover how the typeface was created and to explore more about its features and design elements.

<div id="details-wrapper">
<div id="details-btn" onclick="showDetails()">
    <i id="details-icon" class="fa fa-plus-circle"> </i> Details
</div>

<!-- Details! -->
<div id="details" class="section-light-grey" hidden>

<!-- TODO: Add image of mathematical basis -->

The main idea for the <b>Basically A</b> typeface family is the mathematical concept of a [basis][4], a set which serves as a foundation for other sets. Just as unit lengths in the x direction and y direction form a basis for a 2-D plane—any point in the 2-D plane can be expressed as a set of scaled unit vectors—we aimed to create a set of simple, neutral glyphs that can serve as a basis for other geometric typefaces.

Unlike most typeface families where the serif or sans serif is designed first, the Basically A family started with the monospaced typeface, <a href="../bam/" class="bam">Basically A Mono</a> (BAM).<!-- Add link to BAM notes after rewrite. --> When it came time to release BAM version 1.0.0, we set up this website to showcase the typeface. We needed a text typeface, so we decided to create a proportional version of <bam>BAM</bam>.

<div id="circle-line" class="sample-font">
<b>O</b> + <b>I&nbsp</b>
</div>

BASS continues the idea of circles and lines. Each glyph is constructed by connecting lines (technically rectangles), circular arcs, and elliptical arcs when necessary. Free from the mono-space constraint, we were able to further refine the proportions of the glyphs to better match the optimally circular <b>O</b> and <b>o</b>.

<!-- Motivation: Logotype -->

Our goal for version 1 was to explore the characteristics and overall appearance of a truly mono-linear typeface.
After releasing version 1.0.0, we continued to refine BASS by incorporating advancements made while developing our other typefaces, such as optimal elliptic curves and curvature optimizations. We also made adjustments to the balance of the typeface and added more glyphs to expand language coverage.

However, <!-- as any experienced type designer would expect,  --> a truly mono-linear typeface inevitably runs into issues at heavier weights. As with all our typefaces, each glyph is defined by a function that takes the target stroke width as an input, which is mapped to a font weight, and returns the contours for the given input.
When extrapolating the glyph functions up to <thick>Thick</thick> (more commonly called Black), congestion became noticeable, especially with glyphs like <b>e</b> and <b>s</b>. 
Earlier in development, the glyph drawing function for <b>s</b> often failed when trying to render heavier weights due to insufficient space for the spine.
Workarounds had to be implemented to address these issues.
As a result, <extrabold>ExtraBold</extrabold> and <thick>Thick</thick> were designated <b>experimental</b> throughout version 1.

<!-- Changes in V2 -->
<!-- Contrast -->
For version 2, we finally decided to loosen the mono-linear constraint and add stroke contrast as necessary. This change aimed to enhance typographic color while maintaining the constructed design approach. New components were developed to handle varying stroke widths. Notably, circular arcs were replaced with more flexible elliptical arcs with different start and end widths.

<div class="w3-center figure">
<img class="diagram" src="resources/images/ampersand_annotated.png" width="480" />
<div class="fig-desc">The geometric components of the ampersand (<b>&</b>) glyph, in font weight <thick>Thick</thick>. The glyph features various new components: a <blue><b>variable arch</b></blue> at the top, a <red><b>variable quarter arc</b></red> in the bottom left, <green><b>curve-tangent</b></green> component for the leg and arms, and the latest <purple><b>s-spine</b></purple>.</div>
</div>

The ampersand (<b>&</b>) glyph is a good example that showcases a number of new components. On the bottom left bowl</b></red> is the <red><b>variable quarter arc</b></red> which has different start and end stroke widths. The top bowl uses the new <blue><b>variable arch</b></blue> where not only the start, middle, and end stroke widths can be controlled, but also the inner bowl can be shifted relative to the outer bowl. This component was necessary to make the curvature transitions natural, a feature prominently used for reducing joint congestion. A new component pertinent to <b>&</b> is the <green><b>curve-tangent</b></green> component, which is used for the arm and leg. Finally, we revised the <purple><b>s-spine</b></purple> drawing function, connecting the lower and upper bowls, to smoothly connect elliptic arcs with varying stroke widths. (This is already the 4th iteration of the s-bend function.)

<!-- Joint congestion -->
<div class="w3-center figure">
<img class="diagram" src="resources/images/joints_crop2.png" width="560" />
<div class="fig-desc">Example of variable-width arches used to reduce joint congestion for glyphs <b>a</b> and <b>n</b> in font weight <thick>Thick</thick>.</div>
</div>

To improve typographic color in text use, we reduced joint congestion using the variable arch component. This component enabled the creation of natural stroke modulations while adhering to the typeface's constructed design approach. Stylistic Set 3 was added to restore the mono-linear look of version 1, providing an option for large title text or logotypes.

<!-- OpenType features -->
Several OpenType features were added to BASS for version 2, enhancing its functionality and versatility. These additions include <b>SmallCaps (<code>smcp</code>)</b> and <b>Unicase (<code>unic</code>)</b> for creating small caps and unicase text, <b>Stylistic Sets (<code>ss01</code>/<code>ss02</code>/<code>ss03</code>)</b> to provide options for customizing the typeface's appearance, and numeric features including <b>Tabular Numerics (<code>tnum</code>)</b> for aligning numerals in tables, and <b>Fractions (<code>frac</code>)</b> for better fraction display. We cover SmallCaps/Unicase and Stylistic Sets in more detail below.

<!-- Smallcaps -->
<div id="smcp-sample" class="sample-font styleset-samples styleset-border">
<div class="note-item">
	<b>B<fsmcp>ASIC</fsmcp></b>
	<div class="note-annotation">Fake Small Caps</div>
</div>
<div class="note-item">
	<smcp><b>Basic</b></smcp>
	<div class="note-annotation">True Small Caps</div>
</div>
</div>
Scaling uppercase glyphs down to the lowercase height (x-height) is a simple method of achieving small caps. This is known as "fake small caps" or "faux small caps". The issue with this approach is that the stroke width also gets scaled down, making small caps look thinner or lighter than normal glyphs.
To create true small caps, the stroke width of scaled-down glyphs must be adjusted to be thicker, ensuring it closely matches the stroke width of the unscaled glyphs.
In the case of BASS, this is easily achieved due to the typeface's programmatic nature, where each glyph has a function that draws the contours for a target stroke width.
To accurately adjust the stroke width for true small caps, the glyph function is called with an adjusted stroke width where <code>adjusted_stroke_width = stroke_width / x_height * cap_height</code>. 
In practice, we add a nudge factor to fine-tune the stroke width so it looks perceptually balanced in all weights.
True small caps also offers the added benefit of unicase, providing a unique aesthetic which can be useful for eccentric logotypes.

<div id="unic-sample" class="sample-font styleset-samples styleset-border">
<div class="note-item">
	<unic><b>Basıc</b></unic>
	<div class="note-annotation">Unicase*</div>
</div>
<div class="note-item">
	<b>Basic</b>
	<div class="note-annotation">Default</div>
</div>
<div class="note-item">
	<smcp><b>Basic</b></smcp>
	<div class="note-annotation">Small Caps</div>
</div>
<div class="note-annotation2">
* <b>i</b> replaced with <b>ı</b> (dotless i) for style.
</div>
</div>

<!-- Stylistic Sets -->
While designing BASS, we aimed to create a geometric typeface from first principles. The design centered around the circular forms of <b>O</b> and <b>o</b>, aiming for a geometric gothic style similar to ITC Avant Garde Gothic, but with wider and more regular proportions inspired by recent typefaces like Gotham and Gilroy. In version 2, we use the default set as a basis and added alternative glyphs to enhance the versatility of the typeface.

<!-- StyleSet1 - Proportions -->
<div id="ss01-sample" class="sample-font styleset-samples styleset-border">
<div class="note-item">
	<b>MKst138</b>
	<div class="note-annotation">Default</div>
</div>
<div class="note-item">
	<ss01><b>MKst138</b></ss01>
	<div class="note-annotation">StylisticSet 1</div>
</div>
</div>

<ss01>With Stylistic Set 1, we drew further inspiration from ITC Avant Garde Gothic, focusing on the shapes and balance of the alphabet glyphs. We added alternative glyphs, including a full-height arched <b>M</b> and a tailless <b>t</b>. The single-jointed <b>K</b>, <b>k</b> and <b>ĸ</b> were moved to Stylistic Set 1 and double-jointed versions (<ss00><b>K</b>/<b>k</b>/<b>ĸ</b></ss00>) were added to the default set. <b>S</b> and <b>s</b> were made narrower to achieve rounder counters, in contrast to the default <ss00><b>s</b></ss00>, which has a circular silhouette. Many double-storied uppercase glyphs were then adjusted to better balance with the narrower <b>K</b> and <b>S</b>. Alternative versions of the numeric glyphs <b>1</b>, <b>3</b>, <b>8</b> were added to complete the set.</ss01>

<!-- StyleSet2 - Square Dots -->
<div id="ss02-sample" class="sample-font styleset-samples styleset-border">
<div class="note-item l-height">
	<b>“i?!üọ”</b>
	<div class="note-annotation">Default</div>
</div>
<div class="note-item l-height">
	<ss02><b>“i?!üọ”</b></ss02>
	<div class="note-annotation">StylisticSet 2</div>
</div>
</div>

<ss02>Stylistic Set 2 is all about square dots, covering dotted letters (<b>i</b>, <b>j</b>), basic punctuation (<b>.</b>, <b>:</b>, <b>!</b>, <b>?</b>), all forms of commas including quotation marks (<b>,</b>, <b>;</b>, <b>“</b>, <b>”</b>), and diacritic marks that include a dot or comma.
By keeping square dots as a separate set from Stylistic Set 1, you can choose the dot style independently of the alphabet style, giving you greater flexibility and control over your typographic design. More power to you.</ss02>
 
<ss12>By combining Stylistic Sets 1 and 2, we pay homage to Lubalin's vangaurd typeface while staying faithful to BASS's constructed design approach with precise curves and stroke control. It is our reinterpretation of the geometric classic.</ss12>

<!-- StyleSet3 - Joints -->
<div id="ss03-sample" class="sample-font styleset-samples styleset-border">
<div class="note-item l-height">
	<b>hand</b>
	<div class="note-annotation">Default</div>
</div>
<div class="note-item l-height">
	<ss03><b>hand</b></ss03>
	<div class="note-annotation">StylisticSet 3</div>
</div>
</div>

Stylistic Set 3 enables a return to the mono-linear style of version 1, by undoing joint congestion reduction, mostly for lowercase letters. This style is well-suited for big bold lettering, such as headlines and logotypes, as it emphasizes the geometric build of the typeface over readability. Use this feature judiciously.<!-- It has been reported that the quantum fabric of certain graphic designer's neural intelligence may unravel when they encounter typefaces that do not handle joint congestion as they deem correct, causing undetermined mental damage within a local radius around the designer. You have been warned. -->

Of course, you can always combine the OpenType features to create the typographic expression that meets your needs. Explore various combinations in the interactive example below.

<div id="mix-samples" class="sample-font styleset-samples">
</div>

BASS has undergone numerous refinements since its initial release, as we continue to push the boundaries of geometric typography. With the added features in version 2, we evolve BASS from a basic typeface into a typographic toolkit for geometric graphic design projects. We encourage you to experiment with the different styles and features, and share your experiences with us. As we continue to refine and improve BASS, we appreciate your feedback and support.

</div><!-- details End -->
</div><!-- details-wrapper End -->

### DOWNLOAD
To download the current version (vers 2.0.0) click [here][2].<br>
Older versions can be found [here][3].

### LICENSE
Basically A Sans Serif is licensed under the [SIL Open Font License][1]. It is free for personal and commercial use. Send us an email (type@mentallydesigned.com) to share how you used the typeface. Have fun!

[1]: downloads/License.txt
[2]: downloads/bass-vers2_000a.zip
[3]: https://github.com/mental-design/basically-a-sans-serif/tags
[4]: https://en.wikipedia.org/wiki/Basis_(linear_algebra)