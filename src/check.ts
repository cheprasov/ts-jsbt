import { JSBT } from './JSBT';

const data = {
    propertySale: {
        id: 5,
        sourceUrl: 'https://strike.co.uk/property-for-sale/284386',
        providerId: 5,
        propertyTypeId: 2,
        detachedTypeId: 0,
        address: 'Black Prince Road, London, SE11 6JH',
        location: { latitude: 51.4905026, longitude: -0.1167558 },
        tenureId: 3,
        price: 450000,
        bedroomsCount: 1,
        bathroomsCount: null,
        overview:
            "Introducing a fully renovated, uniquely spacious 1-bedroom flat situated on Black Prince Road, in Kennington, London SE11.  \n\nFrom the smartly tiled entrance hall, to the elegant bathroom, this property has had a complete makeover just prior to listing. The bathroom is tiled in sage green herringbone with black contrasting fixtures. The kitchen is also newly renovated in neutral tones with oak worktops.  \n\nThe flat has been thoughtfully designed with a tasteful theme throughout, creating a versatile canvas for you to add your personal touch and make it your own. But what sets this property apart is its potential. With the option to divide the huge 8 metre living room, you have the opportunity to create a second bedroom (subject to the necessary planning permissions). There are also three huge storage cupboards, at least one of which could be turned into a walk in wardrobe. \n\nBeyond the four walls, discover a hidden gem - a vast private garden wrapping around two sides of the property. With classic sandstone paving, new fencing and mature trees, this tranquil oasis offers a rare sanctuary within zone 1. The size is amazing - over 600sqft and completely private, catching the sun from early morning to late afternoon. \n\nLocation-wise, Sullivan House couldn't be better positioned between Kennington and Vauxhall. The area is quiet and leafy, with large communal lawns and mature trees. Yet it is just a short walk from the Thames Embankment and views across to Big Ben. Shopping at the new Battersea Power Station is just a two stops away on the tube, while the pretty village of Kennington is on your doorstep. \n\nIn summary, this stunning 1-bedroom flat in Sullivan House offers not only a luxurious living space but also the potential to tailor it to your needs. With its new bathroom and kitchen, private courtyard garden, huge living space, and the option to create a second bedroom, this property presents an exciting chance to own a slice of London's finest. Contact us today to arrange a viewing.",
        features: [
            '1 Bedroom Flat',
            'Spacious',
            'Sought After Location',
            'Modernized',
            'Excellent Condition',
            'garden',
            'double-glazed-windows',
        ],
        studioFlat: 0,
        garden: null,
        underOffer: 0,
        new: null,
        retirement: null,
        updatedTime: '2023-06-04T18:35:20.000Z',
        photos: [
            {
                id: 1,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/1-bb7c8eb13dcdb3c458f743f126642e90-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 2,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/2-dce1515fa3ed408d23de3f79451ab7d2-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 3,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/3-b193d302f5bb64f0d98c23efb51f2a8d-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 4,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/4-59902583e4148979d5d6ada3feec4073-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 5,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/5-6b3cbe4c7adc0b627179a87a867d0a3b-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 6,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/6-25cdd784227e0fec8291213ad3827f65-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 7,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/7-154b9f28aedea3d14e753db56df772ec-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 8,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/8-abe61eb257816b7142ac56eebcbd61d8-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 9,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/9-78a43d0b51fa1ac14f9920828aeb5223-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 10,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/10-38a4bd08b8f229ca573eaa86a44fed14-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 11,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/11-87982ae56a3e8e8bba96696afb386a7f-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 12,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/12-170d344211d5d59963eb1f7e5b8ec7d3-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 13,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/13-d42f004757d9a96971551b137480c64c-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 14,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/14-be9851bae5460ad7ba2e0aee3cc6e5dc-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 15,
                photoTypeId: 1,
                storageKey: 'property/sale/3/5/15-3d9d53f2184348f1a26efea215806398-w{:width:}.jpg',
                storageId: 3,
                widths: [400, 800, 1024],
            },
            {
                id: 16,
                photoTypeId: 2,
                storageKey: 'property/sale/3/5/16-8cbd432c2926a0b8b4196812a9897cbe-w{:width:}.jpg',
                storageId: 3,
                widths: [1024],
            },
            {
                id: 17,
                photoTypeId: 3,
                storageKey: 'property/sale/3/5/17-9502f0e21c01844f0d207c31b09079ee-w{:width:}.jpg',
                storageId: 3,
                widths: [800],
            },
        ],
    },
};

// Encode
//const encodedData = btoa(JSBT.encode(data));

//const encodedData = 'cQERDHByb3BlcnR5U2FsZXkUEQ1Qcm9wZXJ0eVNhbGUxEQJpZCEFEQlzb3VyY2VVcmwRLWh0dHBzOi8vc3RyaWtlLmNvLnVrL3Byb3BlcnR5LWZvci1zYWxlLzI4NDM4NhEKcHJvdmlkZXJJZCEFEQ5wcm9wZXJ0eVR5cGVJZCECEQ5kZXRhY2hlZFR5cGVJZCARB2FkZHJlc3MRI0JsYWNrIFByaW5jZSBSb2FkLCBMb25kb24sIFNFMTEgNkpIEQhsb2NhdGlvbnECEQhsYXRpdHVkZTcuzQjKyL5JQBEJbG9uZ2l0dWRlNwNKnka1472/EQh0ZW51cmVJZCEDEQVwcmljZSPQ3QYRDWJlZHJvb21zQ291bnQhAREOYmF0aHJvb21zQ291bnQCEQhvdmVydmlldxLlB0ludHJvZHVjaW5nIGEgZnVsbHkgcmVub3ZhdGVkLCB1bmlxdWVseSBzcGFjaW91cyAxLWJlZHJvb20gZmxhdCBzaXR1YXRlZCBvbiBCbGFjayBQcmluY2UgUm9hZCwgaW4gS2VubmluZ3RvbiwgTG9uZG9uIFNFMTEuoCAKCkZyb20gdGhlIHNtYXJ0bHkgdGlsZWQgZW50cmFuY2UgaGFsbCwgdG8gdGhlIGVsZWdhbnQgYmF0aHJvb20sIHRoaXMgcHJvcGVydHkgaGFzIGhhZCBhIGNvbXBsZXRlIG1ha2VvdmVyIGp1c3QgcHJpb3IgdG8gbGlzdGluZy4gVGhlIGJhdGhyb29tIGlzIHRpbGVkIGluIHNhZ2UgZ3JlZW4gaGVycmluZ2JvbmUgd2l0aCBibGFjayBjb250cmFzdGluZyBmaXh0dXJlcy4gVGhlIGtpdGNoZW4gaXMgYWxzbyBuZXdseSByZW5vdmF0ZWQgaW4gbmV1dHJhbCB0b25lcyB3aXRoIG9hayB3b3JrdG9wcy6gIAoKVGhlIGZsYXQgaGFzIGJlZW4gdGhvdWdodGZ1bGx5IGRlc2lnbmVkIHdpdGggYSB0YXN0ZWZ1bCB0aGVtZSB0aHJvdWdob3V0LCBjcmVhdGluZyBhIHZlcnNhdGlsZSBjYW52YXMgZm9yIHlvdSB0byBhZGQgeW91ciBwZXJzb25hbCB0b3VjaCBhbmQgbWFrZSBpdCB5b3VyIG93bi4gQnV0IHdoYXQgc2V0cyB0aGlzIHByb3BlcnR5IGFwYXJ0IGlzIGl0cyBwb3RlbnRpYWwuIFdpdGggdGhlIG9wdGlvbiB0byBkaXZpZGUgdGhlIGh1Z2UgOCBtZXRyZSBsaXZpbmcgcm9vbSwgeW91IGhhdmUgdGhlIG9wcG9ydHVuaXR5IHRvIGNyZWF0ZSBhIHNlY29uZCBiZWRyb29tIChzdWJqZWN0IHRvIHRoZSBuZWNlc3NhcnkgcGxhbm5pbmcgcGVybWlzc2lvbnMpLiBUaGVyZSBhcmUgYWxzbyB0aHJlZSBodWdlIHN0b3JhZ2UgY3VwYm9hcmRzLCBhdCBsZWFzdCBvbmUgb2Ygd2hpY2ggY291bGQgYmUgdHVybmVkIGludG8gYSB3YWxrIGluIHdhcmRyb2JlLiAKCkJleW9uZCB0aGUgZm91ciB3YWxscywgZGlzY292ZXIgYSBoaWRkZW4gZ2VtIC0gYSB2YXN0IHByaXZhdGUgZ2FyZGVuIHdyYXBwaW5nIGFyb3VuZCB0d28gc2lkZXMgb2YgdGhlIHByb3BlcnR5LiBXaXRoIGNsYXNzaWMgc2FuZHN0b25lIHBhdmluZywgbmV3IGZlbmNpbmcgYW5kIG1hdHVyZSB0cmVlcywgdGhpcyB0cmFucXVpbCBvYXNpcyBvZmZlcnMgYSByYXJlIHNhbmN0dWFyeSB3aXRoaW4gem9uZSAxLiBUaGUgc2l6ZSBpcyBhbWF6aW5nIC0gb3ZlciA2MDBzcWZ0IGFuZCBjb21wbGV0ZWx5IHByaXZhdGUsIGNhdGNoaW5nIHRoZSBzdW4gZnJvbSBlYXJseSBtb3JuaW5nIHRvIGxhdGUgYWZ0ZXJub29uLiAKCkxvY2F0aW9uLXdpc2UsIFN1bGxpdmFuIEhvdXNlIGNvdWxkbid0IGJlIGJldHRlciBwb3NpdGlvbmVkIGJldHdlZW4gS2VubmluZ3RvbiBhbmQgVmF1eGhhbGwuIFRoZSBhcmVhIGlzIHF1aWV0IGFuZCBsZWFmeSwgd2l0aCBsYXJnZSBjb21tdW5hbCBsYXducyBhbmQgbWF0dXJlIHRyZWVzLiBZZXQgaXQgaXMganVzdCBhIHNob3J0IHdhbGsgZnJvbSB0aGUgVGhhbWVzIEVtYmFua21lbnQgYW5kIHZpZXdzIGFjcm9zcyB0byBCaWcgQmVuLiBTaG9wcGluZyBhdCB0aGUgbmV3IEJhdHRlcnNlYSBQb3dlciBTdGF0aW9uIGlzIGp1c3QgYSB0d28gc3RvcHMgYXdheSBvbiB0aGUgdHViZSwgd2hpbGUgdGhlIHByZXR0eSB2aWxsYWdlIG9mIEtlbm5pbmd0b24gaXMgb24geW91ciBkb29yc3RlcC4gCgpJbiBzdW1tYXJ5LCB0aGlzIHN0dW5uaW5nIDEtYmVkcm9vbSBmbGF0IGluIFN1bGxpdmFuIEhvdXNlIG9mZmVycyBub3Qgb25seSBhIGx1eHVyaW91cyBsaXZpbmcgc3BhY2UgYnV0IGFsc28gdGhlIHBvdGVudGlhbCB0byB0YWlsb3IgaXQgdG8geW91ciBuZWVkcy4gV2l0aCBpdHMgbmV3IGJhdGhyb29tIGFuZCBraXRjaGVuLCBwcml2YXRlIGNvdXJ0eWFyZCBnYXJkZW4sIGh1Z2UgbGl2aW5nIHNwYWNlLCBhbmQgdGhlIG9wdGlvbiB0byBjcmVhdGUgYSBzZWNvbmQgYmVkcm9vbSwgdGhpcyBwcm9wZXJ0eSBwcmVzZW50cyBhbiBleGNpdGluZyBjaGFuY2UgdG8gb3duIGEgc2xpY2Ugb2YgTG9uZG9uJ3MgZmluZXN0LiBDb250YWN0IHVzIHRvZGF5IHRvIGFycmFuZ2UgYSB2aWV3aW5nLhEIZmVhdHVyZXNRBxEOMSBCZWRyb29tIEZsYXQRCFNwYWNpb3VzERVTb3VnaHQgQWZ0ZXIgTG9jYXRpb24RCk1vZGVybml6ZWQRE0V4Y2VsbGVudCBDb25kaXRpb24RBmdhcmRlbhEVZG91YmxlLWdsYXplZC13aW5kb3dzEQpzdHVkaW9GbGF0ILEfAhEKdW5kZXJPZmZlciARA25ldwIRCnJldGlyZW1lbnQCEQt1cGRhdGVkVGltZcZAPrGHiAERBnBob3Rvc1ERcQURAmlkIQERC3Bob3RvVHlwZUlkIQERCnN0b3JhZ2VLZXkRQ3Byb3BlcnR5L3NhbGUvMy81LzEtYmI3YzhlYjEzZGNkYjNjNDU4Zjc0M2YxMjY2NDJlOTAtd3s6d2lkdGg6fS5qcGcRCXN0b3JhZ2VJZCEDEQZ3aWR0aHNRAyKQASIgAyIABHEFEQJpZCECsSohAbErEUNwcm9wZXJ0eS9zYWxlLzMvNS8yLWRjZTE1MTVmYTNlZDQwOGQyM2RlM2Y3OTQ1MWFiN2QyLXd7OndpZHRoOn0uanBnsS0hA7EuUQOxMLExsTJxBRECaWQhA7EqIQGxKxFDcHJvcGVydHkvc2FsZS8zLzUvMy1iMTkzZDMwMmY1YmI2NGYwZDk4YzIzZWZiNTFmMmE4ZC13ezp3aWR0aDp9LmpwZ7EtIQOxLrk1cQURAmlkIQSxKiEBsSsRQ3Byb3BlcnR5L3NhbGUvMy81LzQtNTk5MDI1ODNlNDE0ODk3OWQ1ZDZhZGEzZmVlYzQwNzMtd3s6d2lkdGg6fS5qcGexLSEDsS65NXEFEQJpZCEFsSohAbErEUNwcm9wZXJ0eS9zYWxlLzMvNS81LTZiM2NiZTRjN2FkYzBiNjI3MTc5YTg3YTg2N2QwYTNiLXd7OndpZHRoOn0uanBnsS0hA7EuuTVxBRECaWQhBrEqIQGxKxFDcHJvcGVydHkvc2FsZS8zLzUvNi0yNWNkZDc4NDIyN2UwZmVjODI5MTIxM2FkMzgyN2Y2NS13ezp3aWR0aDp9LmpwZ7EtIQOxLrk1cQURAmlkIQexKiEBsSsRQ3Byb3BlcnR5L3NhbGUvMy81LzctMTU0YjlmMjhhZWRlYTNkMTRlNzUzZGI1NmRmNzcyZWMtd3s6d2lkdGg6fS5qcGexLSEDsS65NXEFEQJpZCEIsSohAbErEUNwcm9wZXJ0eS9zYWxlLzMvNS84LWFiZTYxZWIyNTc4MTZiNzE0MmFjNTZlZWJjYmQ2MWQ4LXd7OndpZHRoOn0uanBnsS0hA7EuuTVxBRECaWQhCbEqIQGxKxFDcHJvcGVydHkvc2FsZS8zLzUvOS03OGE0M2QwYjUxZmExYWMxNGY5OTIwODI4YWViNTIyMy13ezp3aWR0aDp9LmpwZ7EtIQOxLrk1cQURAmlkIQqxKiEBsSsRRHByb3BlcnR5L3NhbGUvMy81LzEwLTM4YTRiZDA4YjhmMjI5Y2E1NzNlYWE4NmE0NGZlZDE0LXd7OndpZHRoOn0uanBnsS0hA7EuuTVxBRECaWQhC7EqIQGxKxFEcHJvcGVydHkvc2FsZS8zLzUvMTEtODc5ODJhZTU2YTNlOGU4YmJhOTY2OTZhZmIzODZhN2Ytd3s6d2lkdGg6fS5qcGexLSEDsS65NXEFEQJpZCEMsSohAbErEURwcm9wZXJ0eS9zYWxlLzMvNS8xMi0xNzBkMzQ0MjExZDVkNTk5NjNlYjFmN2U1YjhlYzdkMy13ezp3aWR0aDp9LmpwZ7EtIQOxLrk1cQURAmlkIQ2xKiEBsSsRRHByb3BlcnR5L3NhbGUvMy81LzEzLWQ0MmYwMDQ3NTdkOWE5Njk3MTU1MWIxMzc0ODBjNjRjLXd7OndpZHRoOn0uanBnsS0hA7EuuTVxBRECaWQhDrEqIQGxKxFEcHJvcGVydHkvc2FsZS8zLzUvMTQtYmU5ODUxYmFlNTQ2MGFkN2JhMmUwYWVlM2NjNmU1ZGMtd3s6d2lkdGg6fS5qcGexLSEDsS65NXEFEQJpZCEPsSohAbErEURwcm9wZXJ0eS9zYWxlLzMvNS8xNS0zZDlkNTNmMjE4NDM0OGYxYTI2ZWZlYTIxNTgwNjM5OC13ezp3aWR0aDp9LmpwZ7EtIQOxLrk1cQURAmlkIRCxKiECsSsRRHByb3BlcnR5L3NhbGUvMy81LzE2LThjYmQ0MzJjMjkyNmEwYjhiNDE5NjgxMmE5ODk3Y2JlLXd7OndpZHRoOn0uanBnsS0hA7EuUQGxMnEFEQJpZCERsSohA7ErEURwcm9wZXJ0eS9zYWxlLzMvNS8xNy05NTAyZjBlMjFjMDE4NDRmMGQyMDdjMzFiMDkwNzllZS13ezp3aWR0aDp9LmpwZ7EtIQOxLlEBsTE=';

//const s = JSBT.encode(`Hello� \n\nWorl and � \n\nAlex`);
debugger;
const s = JSBT.encode(`�Alex`);

// Decode
const decodedData = JSBT.decode(s);

console.log(decodedData);
