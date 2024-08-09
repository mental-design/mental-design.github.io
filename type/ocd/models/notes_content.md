<b>Outline Cutout Detail (OCD)</b> is a geometric sans serif typeface designed for display use. It was created to study the relationship between the outline and the counter (cutout). 

The typeface was created with real geometry — each glyph is formed through a series of additive and subtractive steps using geometric primitives, fitted together by solving geometric equations, ensuring a high level of precision. The result is a clean, crisp geometric sans serif with a meticulously crafted appearance.

OCD comes in <strong>7 weights</strong> with <strong>3 additional stylistic sets</strong> to fit your design needs. The stylistic sets are <span class="bam" style="font-weight:400">ss01</span>: a style with cut apexes (<span class="ocd ss01">Aa</span>), <span class="bam" style="font-weight:400">ss02</span>: a style with geometric alternatives (<span class="ocd ss02">Aa</span>), and <span class="bam" style="font-weight:400">ss03</span>: a style with geometric alternatives and cut apexes (<span class="ocd ss03">Aa</span>).
Try them out by adjusting the <span class="ocd">Aa</span> slider in the section above.

Click the Details button below for more information on how the typeface was made.

<div id="details-wrapper">
<div id="details-btn" onclick="showDetails()">
    <i id="details-icon" class="fa fa-plus-circle"> </i> Details
</div>

<!-- Details! -->
<div id="details" class="section-light-grey" hidden>

<br/>
<div class="w3-center">
<img class="diagram" src="resources/images/thb/c_process.png" width="480px"/>
</div>
<br/>

<!-- Motivation -->
The idea for OCD started with an observation: the <img class="futura-img" src="resources/images/futura_C.png"></img>s in Futura are a peculiar exception.
Other glyphs in Futura, especially those with bends like <img class="futura-img" src="resources/images/futura_J.png"></img>, <img class="futura-img" src="resources/images/futura_S.png"></img>, <img class="futura-img" src="resources/images/futura_g.png"></img>, <img class="futura-img" src="resources/images/futura_r.png"></img>, and <img class="futura-img" src="resources/images/futura_amp.png"></img>, have perpendicular terminals that imply a stroke.
In contrast, the terminals of the <img class="futura-img" src="resources/images/futura_C.png"></img>s are cut vertically — two concentric circles with one side lopped off — creating a machined appearance rather than suggesting a stroke.

Another source of inspiration was <a href="https://en.wikipedia.org/wiki/Punchcutting">punchcutting</a>. 
Punchcutting is a craft used in traditional typography where letter punches are cut in steel as the initial stage of making metal type. 
There is a mechanical process that needs to be figured out for each glyph. 
If a glyph has an enclosed space, a separate punch must be made for shaping the final punch.
This punch is known as a counter punch, and is the origin of the word "counter" in type design. For more complicated shapes, a "counter-counter punch" maybe required to shape the counter punch as depicted in the diagram below.

<div class="w3-center figure">
<img class="diagram" src="resources/images/counter.png" width="480"/>
<span class="fig-desc">Diagram of a punch cut of H being made. (From <i>"On Punch Cutting & Wood Cutting"</i>, Rudolf Koch & Fritz Kredel, 1932. <a href="https://www.circuitousroot.com/artifice/letters/press/typemaking/literature/punchcutting/index.html#rudolf-koch-1932-colophon">Source</a>).
</div>

In contrast to punchcutting, digital type is made by placing points to shape contours, commonly in the form of lines and Bezier curves. 
In practice, a type designer typically begins by sketching the glyphs, transferring these sketches to a font editor, then fitting contours to the sketches and making additional adjustments as necessary.

We wanted to design a typeface directly using a process similar to punchcutting. The core idea was to form glyphs through a series of additive and subtractive steps using geometric primitives. This meant the first shape would become the <b>Outline</b>, then the counter would be <b>Cutout</b>, and if necessary <b>Details</b> would be added, like a cross bar in the case of <span class="ocd">A</span>.

The thought of creating separate components for the outlines and contours occurred while working on <a href="../bam">Basically A Mono</a> (BAM) and <a href="../bass">Basically A Sans Serif</a> (BASS). Each glyph in BAM and BASS is constructed by assembling monolinear parts following a geometric stroke, much like fitting pipes together. This made it easy to create very geometric and monolinear glyphs, which is the core concept of the Basically A typeface family. The side effect of this approach is that the outlines and counters were determined by the implied stroke, making it very difficult to adjust the counters independently from the outlines. 
An additive/subtractive approach would allow for independent control of the outlines and counters, adding a degree of freedom for adjustments. Furthermore, the relative movement between the outlines and counters would naturally create stroke modulations while keeping both parts geometric.

<!-- Design Goals -->
OCD is a monolinear typeface. But unlike BAM and BASS which are strictly monolinear, subtle adjustments to the line widths were made to improve the legibility and <a href="https://en.wikipedia.org/wiki/Type_color">color</a>, especially towards the bolder weights. While adding adjustments, we still wanted the typeface to maintain a strong sense of geometry and stroke consistency. We did not want to deviate too much from the original geometric form.
To achieve this, we applied the concept of <a href="https://en.wikipedia.org/wiki/Just-noticeable_difference">Just-noticeable Difference (JND)</a>. JND is a concept in psychology where a change of a stimuli is perceptible about half the time. This is applied to OCD qualitatively; any deviation from an ideal geometric primitive must be barely perceptible and any perceptible change must have a clear reason. 
<!-- XXX: Give an example. -->

<!-- Process -->

<div id="s-proc-full" class="w3-center figure">
<img class="diagram" src="resources/images/thb/s_process.png" width="600px"/>
<span class="fig-desc">The design process for <span class="ocd">S</span>.<br/><span class="fig-marker">Left</span>: The initial shape decomposition. <span class="fig-marker">Center</span>: Finding the two points that smoothly connect two quarter ellipses. (The solution can be obtained numerically using the last two equations.) <span class="fig-marker">Right</span>: The actual shapes used to form <span class="ocd">S</span> after parameter tuning. (<a href="resources/images/s_process.png">Enlarge</a>)</span>
</div>

<div id="s-proc-div" class="w3-center figure">
<div id="s-process"></div>
</div>

Having settled on the overall approach to the typeface, the next step was to solve the geometry for each glyph.
First, each glyph must be <b>decomposed</b> into geometric primitives and these components must be designated for addition or subtraction. This is straightforward with some glyphs such as <span class="ocd">O</span>, <span class="ocd">C</span> or <span class="ocd">D</span>. It can get more involved with glyphs such as <span class="ocd">S</span>, <span class="ocd">&</span> or <span class="ocd">∞</span>. Sometimes there are multiple solutions as in the case of <span class="ocd">X</span> or <span class="ocd">y</span>, each choice making certain adjustments easier while making others harder.

Next, the decomposition needs to be translated to code. To ensure each part will properly meet and be placed in the intended position, we need to solve many geometry problems — problems including 
smoothly connecting two elliptical curves (<span class="ocd">S</span>, <span class="ocd">~</span>), 
finding the major and minor semi-axis of a quarter ellipse that will meet a given line smoothly (<span class="ocd">&</span>, <span class="ocd">ę</span>),
finding the displacement for two triangles to create target line widths (<span class="ocd">V</span>) or for four (<span class="ocd">W</span>), to list a few. We call this process <b>rigging</b>, as our main interest is to get the parts in place mechanically, just like rigging a theatre stage where moving parts are interconnected with ropes and pulleys behind the stage.

Once a glyph is rigged, we can finally start <b>tuning</b> the parameters. It is here that we get to experiment with the widths, balance and other details of the typeface like reducing congestion around joints.
During the tuning process some glyphs can become more complex than it may seem. The glyph <span class="ocd">C</span> is a good example. Initially comprised of two circles and a rectangle to cut the ends, this configuration causes the terminals to quickly elongate and become too sharp towards the heavier weights.
This issue can be addressed by generalizing the terminals from quarter circles to quarter ellipses, then adjusting the radii to balance the ends.

<div class="w3-center figure">
<img class="diagram" src="resources/images/thb/c_adjusted.png" width="480px"/>
<span class="fig-desc">The shapes used to create capital <span class="ocd">C</span>. The terminals have been modified to enable adjustments.</span>
</div>

Some recent currency symbols have design specifications. These include the symbols for Euro (<span class="ocd">€</span>), Turkish Lira (<span class="ocd">₺</span>) and Rupee (<span class="ocd">₹</span>). For these symbols, we adhered to the specification as much as possible. One advantage of the geometric additive/subtractive approach is that these symbols fit very naturally with the rest of the typeface. Additionally, once the specifications are decomposed and rigged, it becomes possible to adjust the shapes for different weights in a consistent manner. Mathematically speaking, we are generalizing the the specification; the specification becomes a special case of our glyph drawing function.

<div class="w3-center figure">
<div id="spec-glyphs"></div>
</div>

In a similar spirit, the infinity symbol (<span class="ocd">∞</span>) was modeled after the <a href="https://en.wikipedia.org/wiki/Lemniscate_of_Bernoulli">Lemniscate of Bernoulli</a>, then adjusted lightly for balance. While not the specification nor its origin, the lemniscate is a mathematically simple yet elegant curve that we consider a reasonable basis for the symbol.

<!-- Refinement -->

The mathematics involved in the rigging process guarantees a high degree of precision in achieving <a href="https://en.wikipedia.org/wiki/Smoothness#Geometric_continuity">G0 and G1 continuities</a>, ensuring that endpoints meet as required and tangents align seamlessly. 
However, we also wanted to improve the G2 curvature transitions for smoother connections between segments, particularly between linear and curved sections. Our goal was to achieve this in a just noticeable manner without compromising the fundamental geometry of the typeface. To accomplish this, we implemented a multi-objective optimization process to adjust the curvatures. The objectives included minimizing curvature discrepancies at segment junctions, preserving the central curve shape, and regularizing the curvatures to reduce extreme curvature changes. This process can be likened to refining an object by sanding it down, smoothing out any bumps or imperfections.

<div class="w3-center figure">
<div id="c2-adjust"></div>
</div>

While initially influenced by Futura, particularly the <img class="futura-img" src="resources/images/futura_C.png"></img>, OCD also embraces the style of 'railroad typefaces' — geometric sans serifs characterized by uniform strokes and sharp terminal cuts (typically vertical and occasionally angled, especially evident in letters like <span class="ocd">C</span> and <span class="ocd">S</span>) which impart a crafted and machined appearance. Originating from <a href="https://en.wikipedia.org/wiki/Johnston_(typeface)">Johnstonʼs Typeface</a> for the London Underground, this aesthetic includes typefaces such as Gill Sans, Granby, Metro #2, Geometric 415, Railway Sans (not to be confused with Raleway).
More recent geometric sans serifs like Geograph, Mont Blanc Type, Programme, Centra No 1, and Hurme Geometric Sans also loosely fall into this category. With OCD, we push the boundaries by creating a typeface with real geometry — shaping each glyph by solving geometric equations, ensuring a high level of precision. The result is a clean, crisp geometric sans serif with a meticulously crafted appearance.

</div>
<!-- Details End -->
</div>

### LICENSE
Outline Cutout Detail is licensed under the [SIL Open Font License][1]. It is free for personal and commercial use. Send us an email (type@mentallydesigned.com) to share how you used the typeface. Have fun!

[1]: downloads/License.txt