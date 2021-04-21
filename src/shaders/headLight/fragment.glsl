varying vec2 vUv;


void main(){

    float circle =  distance(vUv, vec2(0.5));
    circle = 0.2 / circle - 0.4; 



 gl_FragColor = vec4(vec3(circle),circle);   
}