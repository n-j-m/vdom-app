import { create, diff, patch } from 'virtual-dom';


export function createRenderer (mountEl) {
    let node = null, prevVNode = null;

    function createNode (vNode) {
        node = create(vNode);
        if (mountEl) {
            mountEl.innerHTML = '';
            mountEl.appendChild(node);
        }
        prevVNode = vNode;
        return node;
    }

    function updateNode (vNode) {
        const patches = diff(prevVNode, vNode);
        node = patch(node, patches);
        prevVNode = vNode;
        return node;
    }

    function renderer (vNode) {
        return !!node
            ? updateNode(vNode)
            : craeteNode(vNode);
    }

    return renderer;
}
