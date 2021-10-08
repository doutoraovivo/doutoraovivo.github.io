"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagInput = void 0;
const ko = require("knockout");
const Constants = require("../../constants");
const tag_input_html_1 = require("./tag-input.html");
const tag_list_html_1 = require("./tag-list.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const tagService_1 = require("../../services/tagService");
let TagInput = class TagInput {
    constructor(tagService) {
        this.tagService = tagService;
        this.tags = ko.observableArray();
        this.scope = ko.observable();
        this.pattern = ko.observable();
        this.selection = ko.observableArray([]);
        this.availableTags = ko.computed(() => this.tags().filter(tag => !this.selection().map(x => x.id).includes(tag.id)));
        this.empty = ko.computed(() => this.availableTags().length === 0);
        this.onDismiss = new ko.subscribable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.scope) {
                return;
            }
            yield this.resetSearch();
            this.pattern
                .extend({ rateLimit: { timeout: Constants.defaultInputDelayMs, method: "notifyWhenChangesStop" } })
                .subscribe(this.resetSearch);
            this.scope
                .subscribe(this.resetSearch);
        });
    }
    loadPageOfTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const pageOfTags = yield this.tagService.getTags(this.scope(), this.pattern());
            const tags = pageOfTags.value.filter(tag => !this.selection().map(x => x.id).includes(tag.id));
            this.tags(tags);
        });
    }
    resetSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadPageOfTags();
        });
    }
    addTag(tag) {
        this.selection.push(tag);
        if (this.onChange) {
            this.onChange(this.selection());
            this.onDismiss.notifySubscribers();
        }
    }
    removeTag(tag) {
        this.selection.remove(tag);
        if (this.onChange) {
            this.onChange(this.selection());
            this.onDismiss.notifySubscribers();
        }
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], TagInput.prototype, "scope", void 0);
__decorate([
    (0, decorators_1.Event)(),
    __metadata("design:type", Function)
], TagInput.prototype, "onChange", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagInput.prototype, "initialize", null);
TagInput = __decorate([
    (0, decorators_1.Component)({
        selector: "tag-input",
        template: tag_input_html_1.default,
        childTemplates: { tagList: tag_list_html_1.default }
    }),
    __metadata("design:paramtypes", [tagService_1.TagService])
], TagInput);
exports.TagInput = TagInput;
//# sourceMappingURL=tag-input.js.map