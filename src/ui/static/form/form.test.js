const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;

chai.use(spies);

describe('UI. Form functionality test', () => {
    let uploadImage;

    before(() => {
        global.window = {};
        global.document = {
            getElementById: () => ({
                files: [],
                style: {
                    display: '',
                    opacity: ''
                }
            })
        };
        const form = require('./form');
        uploadImage = form.uploadImage;
    });

    it('should use provided XmlHttpRequest class for server fetching', () => {
        const CustomXmlHttpRequest = chai.spy();
        uploadImage(CustomXmlHttpRequest);
        expect(CustomXmlHttpRequest).to.have.been.called();
    });

    it('should not send request if there are no files', () => {
        const CustomXmlHttpRequest = chai.spy();
        CustomXmlHttpRequest.send = chai.spy();
        uploadImage(CustomXmlHttpRequest);

        expect(CustomXmlHttpRequest.send).to.not.have.been.called();
    });

    it('should send request if there is a file in input', () => {
        const sendSpy = chai.spy();
        const CustomXmlHttpRequest = class {
            constructor() {
                this.upload = {
                    onprogress: null
                };
                this.send = sendSpy;
                this.open = () => {
                };
            }
        };

        global.window = {};
        global.document = {
            getElementById: () => ({
                files: [{
                    name: 'test name'
                }],
                style: {
                    display: '',
                    opacity: ''
                }
            })
        };
        global.FormData = function () {
            return {
                append: () => {
                }
            }
        };
        const form = require('./form');
        uploadImage = form.uploadImage;

        uploadImage(CustomXmlHttpRequest);
        expect(sendSpy).to.have.been.called();
    });
});