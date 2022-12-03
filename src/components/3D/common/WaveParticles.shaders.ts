import { Color, ColorRepresentation } from "three";

export const WavesShaderMaterial = (pointColor: ColorRepresentation) => ({
  uniforms: {
    color: { value: new Color(pointColor) },
  },
  vertexShader: `
    attribute float scale;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

        gl_PointSize = scale * ( 300.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color;

    void main() {
        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        gl_FragColor = vec4( color, 1.0 );
    }
  `,
});
