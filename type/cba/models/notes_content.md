Chamfered Beveled Angled (CBA) is a modular display typeface with 7 levels of compressed weights. CBA is a chamfered/beveled/angled version of <a href="../abc/">All Birds Combination</a> (ABC) — a programmatic reinterpretation of Josef Albersʼ Kombinations-Schrift.

For CBA, we replaced the circular curves of ABC with an angular cut, giving the typeface a different look and feel.
While at full width, the typeface looks chiseled and machined, this turns into a folded origami look at thinner weights.

Because CBA uses the same drawing code as ABC, it has, for the most part, the same dimensions as ABC and the two typefaces can be mixed without further adjustments.

<div id="details-wrapper">
<div id="details-btn" onclick="showDetails()">
    <i id="details-icon" class="fa fa-plus-circle"> </i> Details
</div>

<!-- Details! -->
<div id="details" class="section-light-grey" hidden>

Each typeface codebase/system defines a design space. At Mental Design, we not only write our own code to create typefaces, we have a keen interest in using these systems to try different things and experiment. We have previously done this by taking the monospace code of <a href="../bam/">Basically A Mono</a> and extended it to work with varied glyph widths to create <a href="../bass/">Basically A Sans Serif</a>.

In the case of ABC, each glyph was translated to an array of numbers (encodings), that were decoded using a map. (See the Notes section of ABC for details.) Changing the decoder map would create different glyphs and in turn define a new typeface. By replacing the circular components <img src="resources/quad_abc.svg" class="quad"></img> in the decoder map with angular components <img src="resources/quad_cba.svg" class="quad"></img>, we could make a new angular typeface, which is what we did to create CBA.

<div id="image-player"></div>

One of the more interesting decisions to make was the location of the cut. The first attempt was naturally to position the cut where the quarters would create a perfect octogon. However, this made the corners look bulky and unnatural. In the end, we found that positioning the angled cut at the golden ratio created a comfortable balance.

From there, adjustments were made to fix details that did not translate well from round to angular. Also changes were made to make the typeface fit the cut, machined look of CBA. These changes include replacing circle dots with squares and swapping circles in letters like c, a with angled quarters.

<div id="a-weights" class="cba">
    <span style="font-weight:700">a</span>
    <span style="font-weight:600">a</span>
    <span style="font-weight:500">a</span>
    <span style="font-weight:400">a</span>
    <span style="font-weight:300">a</span>
    <span style="font-weight:200">a</span>
    <span style="font-weight:100">a</span>
</div>

Finally, with the same underlying system, we were able to create compressed weights in a consistent style with minimal code changes.

</div>
<!-- Details End -->
</div>

### LICENSE
Chamfered Beveled Angled is licensed under the [SIL Open Font License][1]. It is free for personal and commercial use. Send us an email (type@mentallydesigned.com) to share how you used the typeface. Have fun!

[1]: downloads/License.txt