import * as twgl from 'twgl.js';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

// // RGB Texture:
// // For a 16x16 texture the array must have at least 768 values in it (16x16x3)
// var rgbTex = textureFromPixelArray(gl, [r,g,b,r,g,b...], gl.RGB, 16, 16);

// // RGBA Texture:
// // For a 16x16 texture the array must have at least 1024 values in it (16x16x4)
// var rgbaTex = textureFromPixelArray(gl, [r,g,b,a,r,g,b,a...], gl.RGBA, 16, 16);

export const draw = async ({ canvas, imgSrc }) => {
  const img = new Image();

  const run = () => {
    const gl = canvas.getContext('webgl');
    const ext = gl.getExtension('OES_standard_derivatives');
    if (!ext) {
      return alert('need OES_standard_derivatives');
    }

    const program = twgl.createProgram(gl, [vertexShader, fragmentShader]);
    const positionLoc = gl.getAttribLocation(program, 'position');
    const matrixLoc = gl.getUniformLocation(program, 'matrix');
    img.width = 87;
    img.height = 63;

    const ctx = document
      .createElement('canvas')
      .getContext('2d') as CanvasRenderingContext2D;
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const gridWidth = imgData.width - 1;
    const gridDepth = imgData.height - 1;
    const gridPoints = [] as number[];
    for (let z = 0; z <= gridDepth; ++z) {
      for (let x = 0; x <= gridWidth; ++x) {
        const offset = (z * imgData.width + x) * 4;
        const height = (imgData.data[offset] * 10) / 255;
        gridPoints.push(x, height, z);
      }
    }

    const gridIndices = [] as number[];
    const rowStride = gridWidth + 1;
    // x lines
    for (let z = 0; z <= gridDepth; ++z) {
      const rowOff = z * rowStride;
      for (let x = 0; x < gridWidth; ++x) {
        gridIndices.push(rowOff + x, rowOff + x + 1);
      }
    }
    // z lines
    for (let x = 0; x <= gridWidth; ++x) {
      for (let z = 0; z < gridDepth; ++z) {
        const rowOff = z * rowStride;
        gridIndices.push(rowOff + x, rowOff + x + rowStride);
      }
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(gridPoints),
      gl.STATIC_DRAW
    );

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(gridIndices),
      gl.STATIC_DRAW
    );

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const m4 = twgl.m4;
    const projection = m4.perspective(
      (80 * Math.PI) / 180,
      gl.canvas.clientWidth / gl.canvas.clientHeight,
      0.1,
      100
    );
    const cameraPosition = [-10, 10, -10];
    const target = [gridWidth / 1.5, -10, gridDepth];
    const up = [0, 1, 0];
    const camera = m4.lookAt(cameraPosition, target, up);
    const view = m4.inverse(camera);
    const mat = m4.multiply(projection, view);

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    gl.uniformMatrix4fv(matrixLoc, false, mat);
    const numVertices =
      gridWidth * 2 * (gridDepth + 1) + gridDepth * 2 * (gridWidth + 1);
    gl.drawElements(gl.LINES, numVertices, gl.UNSIGNED_SHORT, 0);
  };

  img.onload = run;
  img.crossOrigin = 'anonymous';
  img.src = imgSrc;
};
