(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TransAVormer = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Add the results components to each of these command objects.
     */
    function addResults(cmds) {
        var ret = cmds;
        for (var _i = 0, ret_1 = ret; _i < ret_1.length; _i++) {
            var cmd = ret_1[_i];
            if (typeof cmd.ran === "undefined") {
                cmd.ran = false;
                cmd.success = true;
                cmd.diagnostic = [];
            }
        }
        return ret;
    }

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * A global counter for unique filenames.
     */
    var fnCounter$1 = 0;
    /**
     * A generic demuxer.
     */
    var Demuxer = /** @class */ (function () {
        function Demuxer(ptr, 
        /**
         * @private
         * LibAV instance.
         */
        _libav, 
        /**
         * @private
         * Input file.
         */
        _input, 
        /**
         * @private
         * Chunk size to read.
         */
        _chunkSize) {
            if (_chunkSize === void 0) { _chunkSize = 65536; }
            this._libav = _libav;
            this._input = _input;
            this._chunkSize = _chunkSize;
            this.component = "demuxer";
            this.streamType = "packet";
            /**
             * @private
             * Set when we've seeked to know to indicate that to the next step.
             */
            this._seeked = false;
            /**
             * @private
             * The libav format context.
             */
            this._fmtCtx = 0;
            this.ptr = ptr;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Demuxers must be initialized.
         */
        Demuxer.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var la, chunkSize, tavFiles_1, filename, f, rdr_1, _a, fmtCtx, streams, spars, _i, streams_1, stream, spar, pkt;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            la = this._libav;
                            chunkSize = this._chunkSize;
                            if (!la.tavFiles) {
                                tavFiles_1 = la.tavFiles = Object.create(null);
                                la.onread =
                                    function (name, pos, len) { return __awaiter(_this, void 0, void 0, function () {
                                        var f, _a, _b, _c, _d;
                                        return __generator(this, function (_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    f = tavFiles_1[name];
                                                    _b = (_a = la).ff_reader_dev_send;
                                                    _c = [name];
                                                    if (!f) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, f(pos, len)];
                                                case 1:
                                                    _d = _e.sent();
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    _d = null;
                                                    _e.label = 3;
                                                case 3:
                                                    _b.apply(_a, _c.concat([_d]));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                la.onblockread =
                                    function (name, pos, len) { return __awaiter(_this, void 0, void 0, function () {
                                        var f, _a, _b, _c, _d;
                                        return __generator(this, function (_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    f = tavFiles_1[name];
                                                    _b = (_a = la).ff_block_reader_dev_send;
                                                    _c = [name, pos];
                                                    if (!f) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, f(pos, len)];
                                                case 1:
                                                    _d = _e.sent();
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    _d = null;
                                                    _e.label = 3;
                                                case 3:
                                                    _b.apply(_a, _c.concat([_d]));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                            }
                            filename = (fnCounter$1++) + ".in";
                            f = this._input;
                            if (!f.arrayBuffer) return [3 /*break*/, 2];
                            // It's a Blob
                            return [4 /*yield*/, la.mkreadaheadfile(filename, f)];
                        case 1:
                            // It's a Blob
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 2:
                            if (!f.getReader) return [3 /*break*/, 4];
                            rdr_1 = f.getReader();
                            la.tavFiles[filename] = function (pos, len) { return __awaiter(_this, void 0, void 0, function () {
                                var rd;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, rdr_1.read()];
                                        case 1:
                                            rd = _a.sent();
                                            return [2 /*return*/, rd.done ? null : rd.value];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, la.mkreaderdev(filename)];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 4:
                            if (!(typeof f.size === "number")) return [3 /*break*/, 6];
                            // It's a random-access file
                            la.tavFiles[filename] = f.read;
                            return [4 /*yield*/, la.mkblockreaderdev(filename, f.size)];
                        case 5:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 6:
                            // It's a stream file
                            la.tavFiles[filename] = function (pos, len) {
                                return f.read(len);
                            };
                            return [4 /*yield*/, la.mkreaderdev(filename)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8: return [4 /*yield*/, la.ff_init_demuxer_file(filename)];
                        case 9:
                            _a = _b.sent(), fmtCtx = _a[0], streams = _a[1];
                            this._fmtCtx = fmtCtx;
                            spars = [];
                            _i = 0, streams_1 = streams;
                            _b.label = 10;
                        case 10:
                            if (!(_i < streams_1.length)) return [3 /*break*/, 13];
                            stream = streams_1[_i];
                            return [4 /*yield*/, la.ff_copyout_codecpar(stream.codecpar)];
                        case 11:
                            spar = _b.sent();
                            spar.time_base_num = stream.time_base_num;
                            spar.time_base_den = stream.time_base_den;
                            spars.push(spar);
                            _b.label = 12;
                        case 12:
                            _i++;
                            return [3 /*break*/, 10];
                        case 13:
                            this.streams = Promise.resolve(spars);
                            return [4 /*yield*/, la.av_packet_alloc()];
                        case 14:
                            pkt = _b.sent();
                            // Create the packet stream
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, res, packets, hadPackets, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0:
                                                return [4 /*yield*/, la.ff_read_frame_multi(fmtCtx, pkt, {
                                                        limit: chunkSize,
                                                        unify: true,
                                                        copyoutPacket: (this.ptr ? "ptr" : "default")
                                                    })];
                                            case 1:
                                                _a = _e.sent(), res = _a[0], packets = _a[1];
                                                // If we seeked, tell the next step
                                                if (this._seeked) {
                                                    controller.enqueue([]);
                                                    this._seeked = false;
                                                }
                                                hadPackets = false;
                                                if (packets[0] && packets[0].length) {
                                                    hadPackets = true;
                                                    controller.enqueue(packets[0]);
                                                }
                                                if (!(res === la.AVERROR_EOF)) return [3 /*break*/, 2];
                                                controller.close();
                                                return [3 /*break*/, 6];
                                            case 2:
                                                if (!(res !== 0 && res !== -la.EAGAIN)) return [3 /*break*/, 4];
                                                _c = (_b = controller).error;
                                                _d = Error.bind;
                                                return [4 /*yield*/, la.ff_error(res)];
                                            case 3:
                                                _c.apply(_b, [new (_d.apply(Error, [void 0, _e.sent()]))()]);
                                                return [3 /*break*/, 6];
                                            case 4:
                                                if (hadPackets)
                                                    return [3 /*break*/, 6];
                                                _e.label = 5;
                                            case 5: return [3 /*break*/, 0];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Demuxer.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var cmdsR, _i, cmdsR_1, cmd, seek, time, min, max, timeBase, streams, time32, min32, max32, res, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            cmdsR = addResults(cmds);
                            _i = 0, cmdsR_1 = cmdsR;
                            _c.label = 1;
                        case 1:
                            if (!(_i < cmdsR_1.length)) return [3 /*break*/, 9];
                            cmd = cmdsR_1[_i];
                            if (!(cmd.c === "seek")) return [3 /*break*/, 8];
                            seek = cmd;
                            time = seek.time;
                            min = seek.min || 0;
                            max = (typeof seek.max === "number") ? seek.max : time;
                            if (!!seek.streamTimebase) return [3 /*break*/, 4];
                            timeBase = [1, 1000000];
                            if (!(typeof seek.stream === "number")) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.streams];
                        case 2:
                            streams = _c.sent();
                            timeBase = [
                                streams[seek.stream].time_base_num || 1,
                                streams[seek.stream].time_base_den || 1000000
                            ];
                            _c.label = 3;
                        case 3:
                            time = Math.round(time * timeBase[1] / timeBase[0]);
                            min = Math.round(min * timeBase[1] / timeBase[0]);
                            max = Math.round(max * timeBase[1] / timeBase[0]);
                            _c.label = 4;
                        case 4:
                            time32 = this._libav.f64toi64(time);
                            min32 = this._libav.f64toi64(min);
                            max32 = this._libav.f64toi64(max);
                            return [4 /*yield*/, this._libav.avformat_seek_file(this._fmtCtx, (typeof seek.stream === "number") ? seek.stream : -1, min32[0], min32[1], time32[0], time32[1], max32[0], max32[1], this._libav.AVSEEK_FLAG_BACKWARD)];
                        case 5:
                            res = _c.sent();
                            this._seeked = true;
                            seek.ran = true;
                            if (!(res >= 0)) return [3 /*break*/, 6];
                            seek.success = seek.success && true;
                            return [3 /*break*/, 8];
                        case 6:
                            seek.success = false;
                            _b = (_a = seek.diagnostic).push;
                            return [4 /*yield*/, this._libav.ff_error(res)];
                        case 7:
                            _b.apply(_a, [_c.sent()]);
                            _c.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 1];
                        case 9: return [2 /*return*/, cmdsR];
                    }
                });
            });
        };
        /**
         * Build a demuxer.
         */
        Demuxer.build = function (libav, init) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new Demuxer(!!init.ptr, libav, init.input);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return Demuxer;
    }());

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Get the stream→stream mapping for this set of streams and this selection.
     */
    function mkMapping(streams, selectionIn) {
        // Canonicalize the selection
        var selection = [];
        var selectionArr = (selectionIn.length)
            ? selectionIn : [selectionIn];
        for (var _i = 0, selectionArr_1 = selectionArr; _i < selectionArr_1.length; _i++) {
            var sel = selectionArr_1[_i];
            if (typeof sel === "number") {
                selection.push({
                    type: "all",
                    selection: sel
                });
            }
            else if (typeof sel === "string") {
                var sel0 = sel[0];
                var sel1 = sel;
                if (sel0 === "v" || sel[0] === "a")
                    sel1 = sel.slice(1);
                selection.push({
                    type: (sel0 === "v") ? "video" :
                        (sel0 === "a") ? "audio" :
                            "all",
                    selection: (sel1.length) ? +sel1 : "all"
                });
            }
            else {
                selection.push(sel);
            }
        }
        // And make the mapping
        var ret = Array(streams.length).fill(-1);
        var outCount = 0;
        for (var _a = 0, selection_1 = selection; _a < selection_1.length; _a++) {
            var sel = selection_1[_a];
            if (sel.selection === "none")
                continue;
            if (sel.selection === "all") {
                // Map everything (of some type)
                for (var i = 0; i < ret.length; i++) {
                    if (ret[i] >= 0)
                        continue;
                    if (sel.type === "all" ||
                        (streams[i].codec_type === 0 /* video */ && sel.type === "video") ||
                        (streams[i].codec_type === 1 && sel.type === "audio")) {
                        ret[i] = outCount++;
                    }
                }
                continue;
            }
            // Otherwise, we have to actually look for the appropriate index
            var idx = 0;
            for (var i = 0; i < ret.length; i++) {
                if (sel.type === "all" ||
                    (streams[i].codec_type === 0 && sel.type === "video") ||
                    (streams[i].codec_type === 1 && sel.type === "audio")) {
                    if (idx === sel.selection) {
                        // Choose this one
                        if (ret[i] < 0)
                            ret[i] = outCount++;
                        break;
                    }
                    idx++;
                }
            }
        }
        return ret;
    }

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Packet selector.
     */
    var PacketSelector = /** @class */ (function () {
        function PacketSelector(
        /**
         * @private
         * LibAV instance.
         */
        _libav, 
        /**
         * @private
         * Input stream.
         */
        _inputP, 
        /**
         * @private
         * Stream selection.
         */
        _sel) {
            this._libav = _libav;
            this._inputP = _inputP;
            this._sel = _sel;
            this.component = "packet-selector";
            this.streamType = "packet";
            this.ptr = false;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Packet selectors must be initialized.
         */
        PacketSelector.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var la, input, streams, mapping, rdr, outStreams, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            this.ptr = input.ptr;
                            return [4 /*yield*/, input.streams];
                        case 2:
                            streams = _a.sent();
                            return [4 /*yield*/, mkMapping(streams, this._sel)];
                        case 3:
                            mapping = _a.sent();
                            rdr = input.stream.getReader();
                            outStreams = [];
                            for (i = 0; i < mapping.length; i++) {
                                if (mapping[i] >= 0)
                                    outStreams.push(streams[mapping[i]]);
                            }
                            this.streams = Promise.resolve(outStreams);
                            this.stream = new ReadableStream({
                                pull: function (controller) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var rd, outPackets, _i, _a, packet, streamIndex, outStreamIndex;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    return [4 /*yield*/, rdr.read()];
                                                case 1:
                                                    rd = _b.sent();
                                                    if (rd.done) {
                                                        controller.close();
                                                        return [3 /*break*/, 14];
                                                    }
                                                    outPackets = [];
                                                    _i = 0, _a = rd.value;
                                                    _b.label = 2;
                                                case 2:
                                                    if (!(_i < _a.length)) return [3 /*break*/, 13];
                                                    packet = _a[_i];
                                                    streamIndex = -1;
                                                    if (!(typeof packet === "number")) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, la.AVPacket_stream_index(packet)];
                                                case 3:
                                                    streamIndex = _b.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    streamIndex = packet.stream_index || 0;
                                                    _b.label = 5;
                                                case 5:
                                                    outStreamIndex = mapping[streamIndex];
                                                    if (!(outStreamIndex < 0)) return [3 /*break*/, 8];
                                                    if (!(typeof packet === "number")) return [3 /*break*/, 7];
                                                    return [4 /*yield*/, la.av_packet_free_js(packet)];
                                                case 6:
                                                    _b.sent();
                                                    _b.label = 7;
                                                case 7: return [3 /*break*/, 12];
                                                case 8:
                                                    if (!(typeof packet === "number")) return [3 /*break*/, 10];
                                                    return [4 /*yield*/, la.AVPacket_stream_index_s(packet, outStreamIndex)];
                                                case 9:
                                                    _b.sent();
                                                    return [3 /*break*/, 11];
                                                case 10:
                                                    packet.stream_index = outStreamIndex;
                                                    _b.label = 11;
                                                case 11:
                                                    outPackets.push(packet);
                                                    _b.label = 12;
                                                case 12:
                                                    _i++;
                                                    return [3 /*break*/, 2];
                                                case 13:
                                                    if (outPackets.length) {
                                                        controller.enqueue(outPackets);
                                                        return [3 /*break*/, 14];
                                                    }
                                                    return [3 /*break*/, 0];
                                                case 14: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        PacketSelector.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a packet selector.
         */
        PacketSelector.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new PacketSelector(libav, input, init.selection);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return PacketSelector;
    }());

    /*
     * This file is part of the libav.js WebCodecs Bridge implementation.
     *
     * Copyright (c) 2023, 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Convert a libav.js audio stream to a WebCodecs configuration.
     *
     * @param libav  The libav.js instance that created this stream.
     * @param stream  The stream to convert.
     */
    function audioStreamToConfig$1(libav, stream) {
        return __awaiter(this, void 0, void 0, function () {
            var codecpar, codecString, ret, extradata, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!stream.codecpar) return [3 /*break*/, 2];
                        return [4 /*yield*/, libav.ff_copyout_codecpar(stream.codecpar)];
                    case 1:
                        codecpar = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        codecpar = stream;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, libav.avcodec_get_name(codecpar.codec_id)];
                    case 4:
                        codecString = _a.sent();
                        ret = {
                            codec: "unknown",
                            sampleRate: codecpar.sample_rate,
                            numberOfChannels: codecpar.channels
                        };
                        extradata = codecpar.extradata;
                        // Then convert the actual codec
                        switch (codecString) {
                            case "flac":
                                ret.codec = "flac";
                                ret.description = extradata;
                                break;
                            case "mp3":
                                ret.codec = "mp3";
                                break;
                            case "aac":
                                {
                                    profile = codecpar.profile;
                                    switch (profile) {
                                        case 1: // AAC_LOW
                                        default:
                                            ret.codec = "mp4a.40.2";
                                            break;
                                        case 4: // AAC_HE
                                            ret.codec = "mp4a.40.5";
                                            break;
                                        case 28: // AAC_HE_V2
                                            ret.codec = "mp4a.40.29";
                                            break;
                                    }
                                    if (extradata)
                                        ret.description = extradata;
                                    break;
                                }
                            case "opus":
                                ret.codec = "opus";
                                break;
                            case "vorbis":
                                ret.codec = "vorbis";
                                ret.description = extradata;
                                break;
                            default:
                                // Best we can do is a libavjs-webcodecs-polyfill-specific config
                                if (typeof LibAVWebCodecs !== "undefined") {
                                    ret.codec = { libavjs: {
                                            codec: codecString,
                                            ctx: {
                                                channels: codecpar.channels,
                                                sample_rate: codecpar.sample_rate
                                            }
                                        } };
                                    if (extradata)
                                        ret.description = extradata;
                                }
                                break;
                        }
                        if (ret.codec)
                            return [2 /*return*/, ret];
                        return [2 /*return*/, null];
                }
            });
        });
    }
    /**
     * Convert a libav.js video stream to a WebCodecs configuration.
     *
     * @param libav  The libav.js instance that created this stream.
     * @param stream  The stream to convert.
     */
    function videoStreamToConfig$1(libav, stream) {
        return __awaiter(this, void 0, void 0, function () {
            var codecpar, codecString, ret, extradata, profile, level, _a, codec, levelS, tier, format, desc, bitDepth, nbComponents, subX, subY, subP, codec, i, s, profileB, profileS, constraints, constraintsS, levelS, codec, dv, profileSpace, profileIDC, profileCompatibility, val, reversed, i, tierFlag, levelIDC, constraintString, i, b, codec, profileS, levelS, format, desc, bitDepth, subX, subY, chromaSubsampling;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!stream.codecpar) return [3 /*break*/, 2];
                        return [4 /*yield*/, libav.ff_copyout_codecpar(stream.codecpar)];
                    case 1:
                        codecpar = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        codecpar = stream;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, libav.avcodec_get_name(codecpar.codec_id)];
                    case 4:
                        codecString = _b.sent();
                        ret = {
                            codec: "unknown",
                            codedWidth: codecpar.width,
                            codedHeight: codecpar.height
                        };
                        extradata = codecpar.extradata;
                        profile = codecpar.profile;
                        level = codecpar.level;
                        _a = codecString;
                        switch (_a) {
                            case "av1": return [3 /*break*/, 5];
                            case "h264": return [3 /*break*/, 13];
                            case "hevc": return [3 /*break*/, 14];
                            case "vp8": return [3 /*break*/, 15];
                            case "vp9": return [3 /*break*/, 16];
                        }
                        return [3 /*break*/, 21];
                    case 5:
                        codec = "av01";
                        // <profile>
                        if (profile < 0)
                            profile = 0;
                        codec += ".0".concat(profile);
                        // <level><tier>
                        if (level < 0)
                            level = 0;
                        levelS = level.toString();
                        if (levelS.length < 2)
                            levelS = "0".concat(level);
                        tier = "M";
                        codec += ".".concat(levelS).concat(tier);
                        format = codecpar.format;
                        return [4 /*yield*/, libav.av_pix_fmt_desc_get(format)];
                    case 6:
                        desc = _b.sent();
                        return [4 /*yield*/, libav.AVPixFmtDescriptor_comp_depth(desc, 0)];
                    case 7:
                        bitDepth = (_b.sent()).toString();
                        if (bitDepth.length < 2)
                            bitDepth = "0".concat(bitDepth);
                        codec += ".".concat(bitDepth);
                        return [4 /*yield*/, libav.AVPixFmtDescriptor_nb_components(desc)];
                    case 8:
                        nbComponents = _b.sent();
                        if (nbComponents < 2)
                            codec += ".1";
                        else
                            codec += ".0";
                        subX = 0, subY = 0, subP = 0;
                        if (!(nbComponents < 2)) return [3 /*break*/, 9];
                        // Monochrome is always considered subsampled (weirdly)
                        subX = 1;
                        subY = 1;
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, libav.AVPixFmtDescriptor_log2_chroma_w(desc)];
                    case 10:
                        subX = _b.sent();
                        return [4 /*yield*/, libav.AVPixFmtDescriptor_log2_chroma_h(desc)];
                    case 11:
                        subY = _b.sent();
                        _b.label = 12;
                    case 12:
                        codec += ".".concat(subX).concat(subY).concat(subP);
                        // FIXME: the rest are technically optional, so left out
                        ret.codec = codec;
                        return [3 /*break*/, 22];
                    case 13:
                        {
                            codec = "avc1";
                            // Technique extracted from hlsenc.c
                            if (extradata &&
                                (extradata[0] | extradata[1] | extradata[2]) === 0 &&
                                extradata[3] === 1 &&
                                (extradata[4] & 0x1F) === 7) {
                                codec += ".";
                                for (i = 5; i <= 7; i++) {
                                    s = extradata[i].toString(16);
                                    if (s.length < 2)
                                        s = "0" + s;
                                    codec += s;
                                }
                            }
                            else {
                                // Do it from the stream data alone
                                // <profile>
                                if (profile < 0)
                                    profile = 77;
                                profileB = profile & 0xFF;
                                profileS = profileB.toString(16);
                                if (profileS.length < 2)
                                    profileS = "0".concat(profileS);
                                codec += ".".concat(profileS);
                                constraints = 0;
                                if (profile & 0x100 /* FF_PROFILE_H264_CONSTRAINED */) {
                                    // One or more of the constraint bits should be set
                                    if (profileB === 66 /* FF_PROFILE_H264_BASELINE */) {
                                        // All three
                                        constraints |= 0xE0;
                                    }
                                    else if (profileB === 77 /* FF_PROFILE_H264_MAIN */) {
                                        // Only constrained to main
                                        constraints |= 0x60;
                                    }
                                    else if (profile === 88 /* FF_PROFILE_H264_EXTENDED */) {
                                        // Only constrained to extended
                                        constraints |= 0x20;
                                    }
                                    else {
                                        // Constrained, but we don't understand how
                                        return [3 /*break*/, 22];
                                    }
                                }
                                constraintsS = constraints.toString(16);
                                if (constraintsS.length < 2)
                                    constraintsS = "0".concat(constraintsS);
                                codec += constraintsS;
                                // <level>
                                if (level < 0)
                                    level = 10;
                                levelS = level.toString(16);
                                if (levelS.length < 2)
                                    levelS = "0".concat(levelS);
                                codec += levelS;
                            }
                            ret.codec = codec;
                            if (extradata && extradata[0])
                                ret.description = extradata;
                            return [3 /*break*/, 22];
                        }
                    case 14:
                        {
                            codec = void 0;
                            if (extradata && extradata.length > 12) {
                                codec = "hvc1";
                                dv = new DataView(extradata.buffer);
                                ret.description = extradata;
                                // Extrapolated from MP4Box.js
                                codec += ".";
                                profileSpace = extradata[1] >> 6;
                                switch (profileSpace) {
                                    case 1:
                                        codec += "A";
                                        break;
                                    case 2:
                                        codec += "B";
                                        break;
                                    case 3:
                                        codec += "C";
                                        break;
                                }
                                profileIDC = extradata[1] & 0x1F;
                                codec += profileIDC + ".";
                                profileCompatibility = dv.getUint32(2);
                                val = profileCompatibility;
                                reversed = 0;
                                for (i = 0; i < 32; i++) {
                                    reversed |= val & 1;
                                    if (i === 31)
                                        break;
                                    reversed <<= 1;
                                    val >>= 1;
                                }
                                codec += reversed.toString(16) + ".";
                                tierFlag = (extradata[1] & 0x20) >> 5;
                                if (tierFlag === 0)
                                    codec += 'L';
                                else
                                    codec += 'H';
                                levelIDC = extradata[12];
                                codec += levelIDC;
                                constraintString = "";
                                for (i = 11; i >= 6; i--) {
                                    b = extradata[i];
                                    if (b || constraintString)
                                        constraintString = "." + b.toString(16) + constraintString;
                                }
                                codec += constraintString;
                            }
                            else {
                                /* NOTE: This string was extrapolated from hlsenc.c, but is clearly
                                 * not valid for every possible H.265 stream. */
                                if (profile < 0)
                                    profile = 0;
                                if (level < 0)
                                    level = 0;
                                codec = "hev1.".concat(profile, ".4.L").concat(level, ".B01");
                            }
                            ret.codec = codec;
                            return [3 /*break*/, 22];
                        }
                    case 15:
                        ret.codec = "vp8";
                        return [3 /*break*/, 22];
                    case 16:
                        codec = "vp09";
                        profileS = profile.toString();
                        if (profile < 0)
                            profileS = "00";
                        if (profileS.length < 2)
                            profileS = "0".concat(profileS);
                        codec += ".".concat(profileS);
                        levelS = level.toString();
                        if (level < 0)
                            levelS = "10";
                        if (levelS.length < 2)
                            levelS = "0".concat(levelS);
                        codec += ".".concat(levelS);
                        format = codecpar.format;
                        return [4 /*yield*/, libav.av_pix_fmt_desc_get(format)];
                    case 17:
                        desc = _b.sent();
                        return [4 /*yield*/, libav.AVPixFmtDescriptor_comp_depth(desc, 0)];
                    case 18:
                        bitDepth = (_b.sent()).toString();
                        if (bitDepth === "0")
                            bitDepth = "08";
                        if (bitDepth.length < 2)
                            bitDepth = "0".concat(bitDepth);
                        codec += ".".concat(bitDepth);
                        return [4 /*yield*/, libav.AVPixFmtDescriptor_log2_chroma_w(desc)];
                    case 19:
                        subX = _b.sent();
                        return [4 /*yield*/, libav.AVPixFmtDescriptor_log2_chroma_h(desc)];
                    case 20:
                        subY = _b.sent();
                        chromaSubsampling = 0;
                        if (subX > 0 && subY > 0) {
                            chromaSubsampling = 1; // YUV420
                        }
                        else if (subX > 0 || subY > 0) {
                            chromaSubsampling = 2; // YUV422
                        }
                        else {
                            chromaSubsampling = 3; // YUV444
                        }
                        codec += ".0".concat(chromaSubsampling);
                        codec += ".1.1.1.0";
                        ret.codec = codec;
                        return [3 /*break*/, 22];
                    case 21:
                        // Best we can do is a libavjs-webcodecs-polyfill-specific config
                        if (typeof LibAVWebCodecs !== "undefined") {
                            ret.codec = { libavjs: {
                                    codec: codecString,
                                    ctx: {
                                        pix_fmt: codecpar.format,
                                        width: codecpar.width,
                                        height: codecpar.height
                                    }
                                } };
                            if (extradata)
                                ret.description = extradata;
                        }
                        return [3 /*break*/, 22];
                    case 22:
                        if (ret.codec)
                            return [2 /*return*/, ret];
                        return [2 /*return*/, null];
                }
            });
        });
    }
    /*
     * Convert the timestamp and duration from a libav.js packet to microseconds for
     * WebCodecs.
     */
    function times$1(packet, timeBaseSrc) {
        // Convert from lo, hi to f64
        var pDuration = (packet.durationhi || 0) * 0x100000000 + (packet.duration || 0);
        var pts = (packet.ptshi || 0) * 0x100000000 + (packet.pts || 0);
        if (typeof LibAV !== "undefined" && LibAV.i64tof64) {
            pDuration = LibAV.i64tof64(packet.duration || 0, packet.durationhi || 0);
            pts = LibAV.i64tof64(packet.pts || 0, packet.ptshi || 0);
        }
        // Get the appropriate time base
        var tbNum = packet.time_base_num || 0;
        var tbDen = packet.time_base_den || 1000000;
        if (!tbNum) {
            if (timeBaseSrc.length) {
                var timeBase = timeBaseSrc;
                tbNum = timeBase[0];
                tbDen = timeBase[1];
            }
            else {
                var timeBase = timeBaseSrc;
                tbNum = timeBase.time_base_num;
                tbDen = timeBase.time_base_den;
            }
        }
        // Convert the duration
        var duration = Math.round(pDuration * tbNum / tbDen * 1000000);
        // Convert the timestamp
        var timestamp = Math.round(pts * tbNum / tbDen * 1000000);
        return { timestamp: timestamp, duration: duration };
    }
    /**
     * Convert a libav.js audio packet to a WebCodecs EncodedAudioChunk.
     * @param packet  The packet itself.
     * @param timeBaseSrc  Source for time base, which can be a Stream or just a
     *                     timebase.
     * @param opts  Extra options. In particular, if using a polyfill, you can set
     *              the EncodedAudioChunk constructor here.
     */
    function packetToEncodedAudioChunk$1(packet, timeBaseSrc, opts) {
        if (opts === void 0) { opts = {}; }
        var EAC;
        if (opts.EncodedAudioChunk)
            EAC = opts.EncodedAudioChunk;
        else
            EAC = EncodedAudioChunk;
        var _a = times$1(packet, timeBaseSrc), timestamp = _a.timestamp, duration = _a.duration;
        return new EAC({
            type: "key", // all audio chunks are keyframes in all audio codecs
            timestamp: timestamp,
            duration: duration,
            data: packet.data.buffer
        });
    }
    /**
     * Convert a libav.js video packet to a WebCodecs EncodedVideoChunk.
     * @param packet  The packet itself.
     * @param timeBaseSrc  Source for time base, which can be a Stream or just a
     *                     timebase.
     * @param opts  Extra options. In particular, if using a polyfill, you can set
     *              the EncodedVideoChunk constructor here.
     */
    function packetToEncodedVideoChunk$1(packet, timeBaseSrc, opts) {
        if (opts === void 0) { opts = {}; }
        var EVC;
        if (opts.EncodedVideoChunk)
            EVC = opts.EncodedVideoChunk;
        else
            EVC = EncodedVideoChunk;
        var _a = times$1(packet, timeBaseSrc), timestamp = _a.timestamp, duration = _a.duration;
        return new EVC({
            type: ((packet.flags || 0) & 1) ? "key" : "delta",
            timestamp: timestamp,
            duration: duration,
            data: packet.data.buffer
        });
    }

    /*
     * This file is part of the libav.js WebCodecs Bridge implementation.
     *
     * Copyright (c) 2023, 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Convert a WebCodecs audio configuration to stream context sufficient for
     * libav.js, namely codecpar and timebase.
     *
     * @param libav  The libav.js instance that created this stream.
     * @param config  The configuration to convert.
     * @returns [address of codecpar, timebase numerator, timebase denominator]
     */
    function configToAudioStream$1(libav, config) {
        return __awaiter(this, void 0, void 0, function () {
            var codecLong, codec, desc, codecpar, _a, _b, _c, _d, _e, _f, timebaseNum, timebaseDen;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        codecLong = config.codec;
                        if (typeof codecLong === "object")
                            codec = codecLong.libavjs.codec;
                        else
                            codec = codecLong.replace(/\..*/, "");
                        // Convert the codec to a libav name
                        switch (codec) {
                            case "mp4a":
                                codec = "aac";
                                break;
                            case "pcm-u8":
                                codec = "pcm_u8";
                                break;
                            case "pcm-s16":
                                codec = "pcm_s16le";
                                break;
                            case "pcm-s24":
                                codec = "pcm_s24le";
                                break;
                            case "pcm-s32":
                                codec = "pcm_s32le";
                                break;
                            case "pcm-f32":
                                codec = "pcm_f32le";
                                break;
                        }
                        return [4 /*yield*/, libav.avcodec_descriptor_get_by_name(codec)];
                    case 1:
                        desc = _g.sent();
                        return [4 /*yield*/, libav.avcodec_parameters_alloc()];
                    case 2:
                        codecpar = _g.sent();
                        if (!desc) return [3 /*break*/, 10];
                        _b = (_a = libav).AVCodecParameters_codec_type_s;
                        _c = [codecpar];
                        return [4 /*yield*/, libav.AVCodecDescriptor_type(desc)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_g.sent()]))];
                    case 4:
                        _g.sent();
                        _e = (_d = libav).AVCodecParameters_codec_id_s;
                        _f = [codecpar];
                        return [4 /*yield*/, libav.AVCodecDescriptor_id(desc)];
                    case 5: return [4 /*yield*/, _e.apply(_d, _f.concat([_g.sent()]))];
                    case 6:
                        _g.sent();
                        if (!config.sampleRate) return [3 /*break*/, 8];
                        return [4 /*yield*/, libav.AVCodecParameters_sample_rate_s(codecpar, config.sampleRate)];
                    case 7:
                        _g.sent();
                        _g.label = 8;
                    case 8:
                        if (!config.numberOfChannels) return [3 /*break*/, 10];
                        return [4 /*yield*/, libav.AVCodecParameters_channels_s(codecpar, config.numberOfChannels)];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10:
                        timebaseNum = 1, timebaseDen = 1000000;
                        if (config.sampleRate)
                            timebaseDen = config.sampleRate;
                        return [2 /*return*/, [codecpar, timebaseNum, timebaseDen]];
                }
            });
        });
    }
    /**
     * Convert a WebCodecs video configuration to stream context sufficient for
     * libav.js, namely codecpar and timebase.
     *
     * @param libav  The libav.js instance that created this stream.
     * @param config  The configuration to convert.
     * @returns [address of codecpar, timebase numerator, timebase denominator]
     */
    function configToVideoStream$1(libav, config) {
        return __awaiter(this, void 0, void 0, function () {
            var codecLong, codec, desc, codecpar, _a, _b, _c, _d, _e, _f, timebaseNum, timebaseDen, fr1001;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        codecLong = config.codec;
                        if (typeof codecLong === "object")
                            codec = codecLong.libavjs.codec;
                        else
                            codec = codecLong.replace(/\..*/, "");
                        // Convert the codec to a libav name
                        switch (codec) {
                            case "av01":
                                codec = "av1";
                                break;
                            case "avc1":
                            case "avc3":
                                codec = "h264";
                                break;
                            case "hev1":
                            case "hvc1":
                                codec = "hevc";
                                break;
                            case "vp09":
                                codec = "vp9";
                                break;
                        }
                        return [4 /*yield*/, libav.avcodec_descriptor_get_by_name(codec)];
                    case 1:
                        desc = _g.sent();
                        return [4 /*yield*/, libav.avcodec_parameters_alloc()];
                    case 2:
                        codecpar = _g.sent();
                        if (!desc) return [3 /*break*/, 9];
                        _b = (_a = libav).AVCodecParameters_codec_type_s;
                        _c = [codecpar];
                        return [4 /*yield*/, libav.AVCodecDescriptor_type(desc)];
                    case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_g.sent()]))];
                    case 4:
                        _g.sent();
                        _e = (_d = libav).AVCodecParameters_codec_id_s;
                        _f = [codecpar];
                        return [4 /*yield*/, libav.AVCodecDescriptor_id(desc)];
                    case 5: return [4 /*yield*/, _e.apply(_d, _f.concat([_g.sent()]))];
                    case 6:
                        _g.sent();
                        return [4 /*yield*/, libav.AVCodecParameters_width_s(codecpar, config.width)];
                    case 7:
                        _g.sent();
                        return [4 /*yield*/, libav.AVCodecParameters_height_s(codecpar, config.height)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9:
                        timebaseNum = 1, timebaseDen = 1000000;
                        if (config.framerate) {
                            // Simple if it's an integer
                            if (config.framerate === ~~config.framerate) {
                                timebaseDen = config.framerate;
                            }
                            else {
                                fr1001 = config.framerate * 1001;
                                if (fr1001 === ~~fr1001) {
                                    timebaseNum = 1001;
                                    timebaseDen = fr1001;
                                }
                                else {
                                    /* Just look for a power of two. This will always work because
                                     * of how floating point works. */
                                    timebaseDen = config.framerate;
                                    while (timebaseDen !== Math.floor(timebaseDen)) {
                                        timebaseNum *= 2;
                                        timebaseDen *= 2;
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, [codecpar, timebaseNum, timebaseDen]];
                }
            });
        });
    }
    /*
     * Convert the timestamp and duration from microseconds to an arbitrary timebase
     * given by libav.js (internal)
     */
    function times(chunk, stream) {
        var num = stream[1];
        var den = stream[2];
        return {
            timestamp: Math.round(chunk.timestamp * den / num / 1000000),
            duration: Math.round((chunk.duration || 0) * den / num / 1000000)
        };
    }
    /*
     * Convert a WebCodecs Encoded{Audio,Video}Chunk to a libav.js packet for muxing. Internal.
     */
    function encodedChunkToPacket(chunk, stream, streamIndex) {
        var _a, _b;
        var _c = times(chunk, stream), timestamp = _c.timestamp, duration = _c.duration;
        // Convert into high and low bits
        var pts, ptshi, dur, durhi;
        if (typeof LibAV !== "undefined" && LibAV.f64toi64) {
            _a = LibAV.f64toi64(timestamp), pts = _a[0], ptshi = _a[1];
            _b = LibAV.f64toi64(duration), dur = _b[0], durhi = _b[1];
        }
        else {
            pts = ~~timestamp;
            ptshi = Math.floor(timestamp / 0x100000000);
            dur = ~~duration;
            durhi = Math.floor(duration / 0x100000000);
        }
        // Create a buffer for it
        var data = new Uint8Array(chunk.byteLength);
        chunk.copyTo(data.buffer);
        // And make a packet
        return {
            data: data,
            pts: pts,
            ptshi: ptshi,
            dts: pts, dtshi: ptshi,
            time_base_num: stream[1], time_base_den: stream[2],
            stream_index: streamIndex,
            flags: 0,
            duration: dur, durationhi: durhi
        };
    }
    /**
     * Convert a WebCodecs EncodedAudioChunk to a libav.js packet for muxing.
     * @param libav  The libav.js instance that created this stream.
     * @param chunk  The chunk itself.
     * @param metadata  The metadata sent with this chunk.
     * @param stream  The stream this packet belongs to (necessary for timestamp conversion).
     * @param streamIndex  The stream index to inject into the packet
     */
    function encodedAudioChunkToPacket$1(libav, chunk, metadata, stream, streamIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // NOTE: libav and metadata are not currently used for audio
                return [2 /*return*/, encodedChunkToPacket(chunk, stream, streamIndex)];
            });
        });
    }
    /**
     * Convert a WebCodecs EncodedVideoChunk to a libav.js packet for muxing. Note
     * that this also may modify codecpar, if the packet comes with extradata.
     * @param libav  The libav.js instance that created this stream.
     * @param chunk  The chunk itself.
     * @param metadata  The metadata sent with this chunk.
     * @param stream  The stream this packet belongs to (necessary for timestamp conversion).
     * @param streamIndex  The stream index to inject into the packet
     */
    function encodedVideoChunkToPacket$1(libav, chunk, metadata, stream, streamIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, codecpar, oldExtradata, description, extradata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ret = encodedChunkToPacket(chunk, stream, streamIndex);
                        if (chunk.type === "key")
                            ret.flags = 1;
                        if (!(stream[0] && metadata && metadata.decoderConfig && metadata.decoderConfig.description)) return [3 /*break*/, 6];
                        codecpar = stream[0];
                        return [4 /*yield*/, libav.AVCodecParameters_extradata(codecpar)];
                    case 1:
                        oldExtradata = _a.sent();
                        if (!!oldExtradata) return [3 /*break*/, 6];
                        description = metadata.decoderConfig.description;
                        if (description.buffer)
                            description = description.slice(0);
                        else
                            description = (new Uint8Array(description)).slice(0);
                        return [4 /*yield*/, libav.malloc(description.length)];
                    case 2:
                        extradata = _a.sent();
                        return [4 /*yield*/, libav.copyin_u8(extradata, description)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, libav.AVCodecParameters_extradata_s(codecpar, extradata)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, libav.AVCodecParameters_extradata_size_s(codecpar, description.length)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, ret];
                }
            });
        });
    }

    /*
     * This file is part of the libav.js WebCodecs Bridge implementation.
     *
     * Copyright (c) 2024 Yahweasel and contributors
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Convert a VideoFrame to a libav.js Frame. The libav.js frame will use the
     * same timebase as WebCodecs, 1/1000000.
     * @param frame  VideoFrame to convert.
     */
    function videoFrameToLAFrame$1(frame) {
        return __awaiter(this, void 0, void 0, function () {
            var data, libavjs5, libavFormat, bpp, planes, cwlog2, chlog2, laFrame, layout, offset, p, w, h, offset, p, plane, wlog2, hlog2, y, w;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = new Uint8Array(frame.allocationSize());
                        return [4 /*yield*/, frame.copyTo(data)];
                    case 1:
                        _a.sent();
                        libavjs5 = true;
                        if (typeof LibAV !== "undefined" && LibAV && LibAV.VER &&
                            parseInt(LibAV.VER) < 5) {
                            libavjs5 = false;
                        }
                        libavFormat = 5, bpp = 1, planes = 3, cwlog2 = 0, chlog2 = 0;
                        switch (frame.format) {
                            case "I420":
                                libavFormat = 0;
                                cwlog2 = chlog2 = 1;
                                break;
                            case "I420A":
                                libavFormat = 33;
                                planes = 4;
                                cwlog2 = chlog2 = 1;
                                break;
                            case "I422":
                                libavFormat = 4;
                                cwlog2 = 1;
                                break;
                            case "NV12":
                                libavFormat = 23;
                                planes = 2;
                                chlog2 = 1;
                                break;
                            case "RGBA":
                            case "RGBX":
                                libavFormat = 26;
                                planes = 1;
                                bpp = 4;
                                break;
                            case "BGRA":
                            case "BGRX":
                                libavFormat = 28;
                                planes = 1;
                                bpp = 4;
                                break;
                        }
                        laFrame = {
                            format: libavFormat,
                            data: null,
                            pts: ~~frame.timestamp,
                            ptshi: Math.floor(frame.timestamp / 0x100000000),
                            time_base_num: 1,
                            time_base_den: 1000000,
                            width: frame.visibleRect.width,
                            height: frame.visibleRect.height
                        };
                        if (libavjs5) {
                            layout = [];
                            offset = 0;
                            for (p = 0; p < planes; p++) {
                                w = frame.visibleRect.width;
                                h = frame.visibleRect.height;
                                if (p === 1 || p === 2) {
                                    w >>= cwlog2;
                                    h >>= chlog2;
                                }
                                layout.push({ offset: offset, stride: w * bpp });
                                offset += w * h * bpp;
                            }
                            laFrame.data = data;
                            laFrame.layout = layout;
                        }
                        else {
                            // libav.js < 5 format: one array per row
                            laFrame.data = [];
                            offset = 0;
                            for (p = 0; p < planes; p++) {
                                plane = [];
                                laFrame.data.push(plane);
                                wlog2 = 0, hlog2 = 0;
                                if (p === 1 || p === 2) {
                                    wlog2 = cwlog2;
                                    hlog2 = chlog2;
                                }
                                for (y = 0; y < frame.visibleRect.height >>> hlog2; y++) {
                                    w = (frame.visibleRect.width * bpp) >>> wlog2;
                                    plane.push(data.subarray(offset, offset + w));
                                    offset += w;
                                }
                            }
                        }
                        return [2 /*return*/, laFrame];
                }
            });
        });
    }
    /**
     * Convert an AudioData to a libav.js Frame. The libav.js frame will use the
     * same timebase as WebCodecs, 1/1000000.
     * @param frame  AudioFrame to convert.
     */
    function audioDataToLAFrame$1(frame) {
        return __awaiter(this, void 0, void 0, function () {
            var libavFormat, TypedArray, planar, laFrame, p, plane, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        libavFormat = 6;
                        TypedArray = Int16Array;
                        planar = /-planar$/.test(frame.format);
                        switch (frame.format) {
                            case "u8":
                            case "u8-planar":
                                libavFormat = planar ? 5 : 0;
                                TypedArray = Uint8Array;
                                break;
                            case "s16":
                            case "s16-planar":
                                libavFormat = planar ? 6 : 1;
                                break;
                            case "s32":
                            case "s32-planar":
                                libavFormat = planar ? 7 : 2;
                                TypedArray = Int32Array;
                                break;
                            case "f32":
                            case "f32-planar":
                                libavFormat = planar ? 8 : 3;
                                TypedArray = Float32Array;
                                break;
                        }
                        laFrame = {
                            format: libavFormat,
                            data: null,
                            pts: ~~frame.timestamp,
                            ptshi: Math.floor(frame.timestamp / 0x100000000),
                            time_base_num: 1,
                            time_base_den: 1000000,
                            sample_rate: frame.sampleRate,
                            nb_samples: frame.numberOfFrames,
                            channels: frame.numberOfChannels
                        };
                        if (!planar) return [3 /*break*/, 5];
                        laFrame.data = [];
                        p = 0;
                        _a.label = 1;
                    case 1:
                        if (!(p < frame.numberOfChannels)) return [3 /*break*/, 4];
                        plane = new TypedArray(frame.numberOfFrames);
                        laFrame.data.push(plane);
                        return [4 /*yield*/, frame.copyTo(plane.buffer, { planeIndex: p, format: frame.format })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        p++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        data = laFrame.data = new TypedArray(frame.numberOfFrames * frame.numberOfChannels);
                        return [4 /*yield*/, frame.copyTo(data.buffer, { planeIndex: 0, format: frame.format })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, laFrame];
                }
            });
        });
    }

    /*
     * This file is part of the libav.js WebCodecs Bridge implementation.
     *
     * Copyright (c) 2024 Yahweasel and contributors
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    // (Duplicated from libav.js)
    function i64tof64(lo, hi) {
        // Common positive case
        if (!hi && lo >= 0)
            return lo;
        // Common negative case
        if (hi === -1 && lo < 0)
            return lo;
        /* Lo bit negative numbers are really just the 32nd bit being
         * set, so we make up for that with an additional 2^32 */
        return (hi * 0x100000000 +
            lo +
            ((lo < 0) ? 0x100000000 : 0));
    }
    /**
     * Convert a libav.js timestamp to a WebCodecs timestamp.
     * @param lo  Low bits of the timestamp.
     * @param hi  High bits of the timestamp.
     * @param timeBase  Optional timebase to use for conversion.
     */
    function laTimeToWCTime(lo, hi, timeBase) {
        var ret = i64tof64(lo, hi);
        if (timeBase)
            ret = Math.round(ret * 1000000 * timeBase[0] / timeBase[1]);
        return ret;
    }
    /**
     * Convert a libav.js Frame to a VideoFrame. If not provided in opts, the
     * libav.js frame is assumed to use the same timebase as WebCodecs, 1/1000000.
     * @param frame  libav.js Frame.
     * @param opts  Optional options, namely a VideoFrame constructor and timebase
     *              to use.
     */
    function laFrameToVideoFrame$1(frame, opts) {
        if (opts === void 0) { opts = {}; }
        var VF;
        if (opts.VideoFrame)
            VF = opts.VideoFrame;
        else
            VF = VideoFrame;
        var layout;
        var data;
        var transfer = [];
        var timeBase = opts.timeBase;
        if (!timeBase && frame.time_base_num)
            timeBase = [frame.time_base_num || 1, frame.time_base_den || 1000000];
        if (frame.layout) {
            // Modern (libav.js ≥ 5) frame in WebCodecs-like format
            data = frame.data;
            layout = frame.layout;
            if (opts.transfer)
                transfer.push(data.buffer);
        }
        else {
            // Pre-libavjs-5 frame with one array per row
            // Combine all the frame data into a single object
            layout = [];
            var size = 0;
            for (var p = 0; p < frame.data.length; p++) {
                var plane = frame.data[p];
                layout.push({
                    offset: size,
                    stride: plane[0].length
                });
                size += plane.length * plane[0].length;
            }
            data = new Uint8Array(size);
            var offset = 0;
            for (var p = 0; p < frame.data.length; p++) {
                var plane = frame.data[p];
                var linesize = plane[0].length;
                for (var y = 0; y < plane.length; y++) {
                    data.set(plane[y], offset);
                    offset += linesize;
                }
            }
            transfer.push(data.buffer);
        }
        // Choose the format
        var format = "I420";
        switch (frame.format) {
            case 0:
                format = "I420";
                break;
            case 33:
                format = "I420A";
                break;
            case 4:
                format = "I422";
                break;
            case 23:
                format = "NV12";
                break;
            case 26:
                format = "RGBA";
                break;
            case 28:
                format = "BGRA";
                break;
            default:
                throw new Error("Unsupported pixel format");
        }
        // And make the VideoFrame
        return new VF(data, {
            format: format,
            codedWidth: frame.width,
            codedHeight: frame.height,
            timestamp: laTimeToWCTime(frame.pts || 0, frame.ptshi || 0, timeBase),
            layout: layout,
            transfer: transfer
        });
    }
    /**
     * Convert a libav.js Frame to an AudioData. If not provide din opts, the
     * libav.js frame is assumed to use the same timebase as WebCodecs, 1/1000000.
     * @param frame  libav.js Frame.
     * @param opts  Optional options, namely an AudioData constructor and timebase
     *              to use.
     */
    function laFrameToAudioData$1(frame, opts) {
        if (opts === void 0) { opts = {}; }
        var AD;
        if (opts.AudioData)
            AD = opts.AudioData;
        else
            AD = AudioData;
        var timeBase = opts.timeBase;
        if (!timeBase && frame.time_base_num)
            timeBase = [frame.time_base_num || 1, frame.time_base_den || 1000000];
        // Combine all the frame data into a single object
        var size = 0;
        if (frame.data.buffer) {
            // Non-planar
            size = frame.data.byteLength;
        }
        else {
            // Planar
            for (var p = 0; p < frame.data.length; p++)
                size += frame.data[p].byteLength;
        }
        var data = new Uint8Array(size);
        if (frame.data.buffer) {
            var rd = frame.data;
            data.set(new Uint8Array(rd.buffer, rd.byteOffset, rd.byteLength));
        }
        else {
            var offset_1 = 0;
            for (var p = 0; p < frame.data.length; p++) {
                var rp = frame.data[p];
                var plane = new Uint8Array(rp.buffer, rp.byteOffset, rp.byteLength);
                data.set(plane, offset_1);
                offset_1 += plane.length;
            }
        }
        // Choose the format
        var format = "s16";
        switch (frame.format) {
            case 0:
                format = "u8";
                break;
            case 1:
                format = "s16";
                break;
            case 2:
                format = "s32";
                break;
            case 3:
                format = "f32";
                break;
            case 5:
                format = "u8-planar";
                break;
            case 6:
                format = "s16-planar";
                break;
            case 7:
                format = "s32-planar";
                break;
            case 8:
                format = "f32-planar";
                break;
            default:
                throw new Error("Unsupported sample format");
        }
        // And make the AudioData
        return new AD({
            format: format,
            data: data,
            sampleRate: frame.sample_rate,
            numberOfFrames: frame.nb_samples,
            numberOfChannels: frame.channels,
            timestamp: laTimeToWCTime(frame.pts || 0, frame.ptshi || 0, timeBase)
        });
    }

    /*
     * This file is part of the libav.js WebCodecs Bridge implementation.
     *
     * Copyright (c) 2023 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /*
     * This is the main entry point and simply exposes the interfaces provided by
     * other components.
     */
    var audioStreamToConfig = audioStreamToConfig$1;
    var videoStreamToConfig = videoStreamToConfig$1;
    var packetToEncodedAudioChunk = packetToEncodedAudioChunk$1;
    var packetToEncodedVideoChunk = packetToEncodedVideoChunk$1;
    var configToAudioStream = configToAudioStream$1;
    var configToVideoStream = configToVideoStream$1;
    var encodedAudioChunkToPacket = encodedAudioChunkToPacket$1;
    var encodedVideoChunkToPacket = encodedVideoChunkToPacket$1;
    var videoFrameToLAFrame = videoFrameToLAFrame$1;
    var audioDataToLAFrame = audioDataToLAFrame$1;
    var laFrameToVideoFrame = laFrameToVideoFrame$1;
    var laFrameToAudioData = laFrameToAudioData$1;

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * A multi-decoder, consisting of decoders for any number of streams.
     */
    var Decoder = /** @class */ (function () {
        function Decoder(ptr, 
        /**
         * @private
         * libav.js instance.
         */
        _libav, 
        /**
         * @private
         * Demuxed input.
         */
        _inputP) {
            this._libav = _libav;
            this._inputP = _inputP;
            this.component = "decoder";
            this.streamType = "frame";
            this.ptr = ptr;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Decoders must be initialized.
         */
        Decoder.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                function cleanup() {
                    return __awaiter(this, void 0, void 0, function () {
                        var _i, destructors_1, destructor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _i = 0, destructors_1 = destructors;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < destructors_1.length)) return [3 /*break*/, 4];
                                    destructor = destructors_1[_i];
                                    return [4 /*yield*/, destructor()];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
                function setDecodeErr(x) { decodeErr = x; console.log(decodeErr); }
                var la, demuxer, streams, demuxStream, demuxEOF, destructors, decodeQueue, decodeErr, decoders, _loop_1, streamIndex;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            demuxer = _a.sent();
                            this.streams = demuxer.streams;
                            return [4 /*yield*/, demuxer.streams];
                        case 2:
                            streams = _a.sent();
                            demuxStream = demuxer.stream.getReader();
                            demuxEOF = false;
                            destructors = [];
                            decodeQueue = [];
                            decodeErr = null;
                            decoders = [];
                            _loop_1 = function (streamIndex) {
                                var stream, wcd_1, wcd_2, lad;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            stream = streams[streamIndex];
                                            if (!(stream.codec_type === la.AVMEDIA_TYPE_VIDEO)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, tryVideoDecoder(la, streamIndex, stream, decodeQueue, setDecodeErr)];
                                        case 1:
                                            wcd_1 = _b.sent();
                                            if (wcd_1) {
                                                decoders.push(wcd_1);
                                                destructors.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    return [2 /*return*/, wcd_1.close()];
                                                }); }); });
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [3 /*break*/, 5];
                                        case 2:
                                            if (!(stream.codec_type === la.AVMEDIA_TYPE_AUDIO)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, tryAudioDecoder(la, streamIndex, stream, decodeQueue, setDecodeErr)];
                                        case 3:
                                            wcd_2 = _b.sent();
                                            if (wcd_2) {
                                                decoders.push(wcd_2);
                                                destructors.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    return [2 /*return*/, wcd_2.close()];
                                                }); }); });
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [3 /*break*/, 5];
                                        case 4:
                                            // Unsupported stream type
                                            decoders.push(null);
                                            return [2 /*return*/, "continue"];
                                        case 5: return [4 /*yield*/, la.ff_init_decoder(stream.codec_id, {
                                                codecpar: stream,
                                                time_base: [stream.time_base_num, stream.time_base_den]
                                            })];
                                        case 6:
                                            lad = _b.sent();
                                            decoders.push(lad);
                                            destructors.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, la.ff_free_decoder(lad[1], lad[2], lad[3])];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            streamIndex = 0;
                            _a.label = 3;
                        case 3:
                            if (!(streamIndex < streams.length)) return [3 /*break*/, 6];
                            return [5 /*yield**/, _loop_1(streamIndex)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            streamIndex++;
                            return [3 /*break*/, 3];
                        case 6:
                            // Create the stream
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var inPackets, _loop_2, this_1, i, _i, decoders_1, dec, _a, c, wcd, laPackets, _b, _c, packet, streamIndex, _loop_3, this_2, i;
                                    var _d, _e;
                                    return __generator(this, function (_f) {
                                        switch (_f.label) {
                                            case 0:
                                                console.log('Pull loop start');
                                                if (!decodeErr) return [3 /*break*/, 2];
                                                console.log('Decode error encountered:', decodeErr);
                                                return [4 /*yield*/, cleanup()];
                                            case 1:
                                                _f.sent();
                                                controller.error(decodeErr);
                                                return [3 /*break*/, 27];
                                            case 2:
                                                if (decodeQueue.length) {
                                                    console.log('Enqueueing frames:', decodeQueue.length);
                                                    controller.enqueue(decodeQueue.splice(0, decodeQueue.length));
                                                    console.log('After enqueue, queue size:', decodeQueue.length);
                                                    return [3 /*break*/, 27];
                                                }
                                                if (!demuxEOF) return [3 /*break*/, 4];
                                                console.log('Demux EOF reached');
                                                return [4 /*yield*/, cleanup()];
                                            case 3:
                                                _f.sent();
                                                controller.close();
                                                return [3 /*break*/, 27];
                                            case 4:
                                                // Get some data to decode
                                                console.log('Reading demux stream...');
                                                return [4 /*yield*/, demuxStream.read()];
                                            case 5:
                                                inPackets = _f.sent();
                                                console.log('Read packets:', inPackets.done, (_d = inPackets.value) === null || _d === void 0 ? void 0 : _d.length);
                                                if (!inPackets.done) return [3 /*break*/, 10];
                                                demuxEOF = true;
                                                _loop_2 = function (i) {
                                                    var dec, _g, c, pkt, frame, res, wcd;
                                                    return __generator(this, function (_h) {
                                                        switch (_h.label) {
                                                            case 0:
                                                                dec = decoders[i];
                                                                if (!dec)
                                                                    return [2 /*return*/, "continue"];
                                                                if (!dec.length) return [3 /*break*/, 2];
                                                                _g = dec, c = _g[1], pkt = _g[2], frame = _g[3];
                                                                return [4 /*yield*/, la.ff_decode_multi(c, pkt, frame, [], {
                                                                        fin: true,
                                                                        copyoutFrame: (this_1.ptr ? "ptr" : "default")
                                                                    })];
                                                            case 1:
                                                                res = _h.sent();
                                                                decodeQueue.push.apply(decodeQueue, res.map(function (x) { return ({
                                                                    streamIndex: i,
                                                                    frame: x
                                                                }); }));
                                                                return [3 /*break*/, 4];
                                                            case 2:
                                                                wcd = dec;
                                                                return [4 /*yield*/, wcd.flush()];
                                                            case 3:
                                                                _h.sent();
                                                                _h.label = 4;
                                                            case 4: return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                this_1 = this;
                                                i = 0;
                                                _f.label = 6;
                                            case 6:
                                                if (!(i < decoders.length)) return [3 /*break*/, 9];
                                                return [5 /*yield**/, _loop_2(i)];
                                            case 7:
                                                _f.sent();
                                                _f.label = 8;
                                            case 8:
                                                i++;
                                                return [3 /*break*/, 6];
                                            case 9: return [3 /*break*/, 0];
                                            case 10:
                                                if (!(inPackets.value.length === 0)) return [3 /*break*/, 16];
                                                _i = 0, decoders_1 = decoders;
                                                _f.label = 11;
                                            case 11:
                                                if (!(_i < decoders_1.length)) return [3 /*break*/, 16];
                                                dec = decoders_1[_i];
                                                if (!dec)
                                                    return [3 /*break*/, 15];
                                                if (!dec.length) return [3 /*break*/, 13];
                                                _a = dec, c = _a[1];
                                                return [4 /*yield*/, this._libav.avcodec_flush_buffers(c)];
                                            case 12:
                                                _f.sent();
                                                return [3 /*break*/, 15];
                                            case 13:
                                                wcd = dec;
                                                return [4 /*yield*/, wcd.flush()];
                                            case 14:
                                                _f.sent();
                                                _f.label = 15;
                                            case 15:
                                                _i++;
                                                return [3 /*break*/, 11];
                                            case 16:
                                                laPackets = {};
                                                console.log('Grouping packets...');
                                                _b = 0, _c = inPackets.value;
                                                _f.label = 17;
                                            case 17:
                                                if (!(_b < _c.length)) return [3 /*break*/, 22];
                                                packet = _c[_b];
                                                streamIndex = -1;
                                                if (!(typeof packet === "number")) return [3 /*break*/, 19];
                                                return [4 /*yield*/, la.AVPacket_stream_index(packet)];
                                            case 18:
                                                // Pointer packet
                                                streamIndex = _f.sent();
                                                return [3 /*break*/, 20];
                                            case 19:
                                                streamIndex = packet.stream_index;
                                                _f.label = 20;
                                            case 20:
                                                console.log('Packet stream index:', streamIndex);
                                                if (streamIndex < 0 || !decoders[streamIndex])
                                                    return [3 /*break*/, 21];
                                                laPackets[streamIndex] = laPackets[streamIndex] || [];
                                                laPackets[streamIndex].push(packet);
                                                _f.label = 21;
                                            case 21:
                                                _b++;
                                                return [3 /*break*/, 17];
                                            case 22:
                                                console.log('Grouped packets:', Object.keys(laPackets));
                                                // Decode
                                                console.log('Starting decode loop...');
                                                _loop_3 = function (i) {
                                                    var stream, packets, dec, _j, c, pkt, frame, res, wcd_3, _k, packets_1, packet, evd, ead;
                                                    return __generator(this, function (_l) {
                                                        switch (_l.label) {
                                                            case 0:
                                                                if (!laPackets[i] || !decoders[i])
                                                                    return [2 /*return*/, "continue"];
                                                                console.log('Processing stream:', i);
                                                                stream = streams[i];
                                                                packets = laPackets[i];
                                                                dec = decoders[i];
                                                                console.log('Stream type:', stream.codec_type === la.AVMEDIA_TYPE_VIDEO ? 'video' : 'audio');
                                                                // When processing each stream
                                                                console.log("Processing stream ".concat(i, ", decoder:"), (_e = decoders[i]) === null || _e === void 0 ? void 0 : _e.constructor.name);
                                                                if (!dec.length) return [3 /*break*/, 2];
                                                                // libav.js decoder
                                                                console.log('Using LibAV decoder');
                                                                _j = dec, c = _j[1], pkt = _j[2], frame = _j[3];
                                                                return [4 /*yield*/, la.ff_decode_multi(c, pkt, frame, packets, {
                                                                        copyoutFrame: (this_2.ptr ? "ptr" : "default")
                                                                    })];
                                                            case 1:
                                                                res = _l.sent();
                                                                decodeQueue.push.apply(decodeQueue, res.map(function (x) { return ({
                                                                    streamIndex: i,
                                                                    frame: x
                                                                }); }));
                                                                return [3 /*break*/, 9];
                                                            case 2:
                                                                // WebCodecs decoder
                                                                console.log('Using WebCodecs decoder');
                                                                wcd_3 = dec;
                                                                _k = 0, packets_1 = packets;
                                                                _l.label = 3;
                                                            case 3:
                                                                if (!(_k < packets_1.length)) return [3 /*break*/, 9];
                                                                packet = packets_1[_k];
                                                                if (!(typeof packet === "number")) return [3 /*break*/, 5];
                                                                console.log("".concat(packet, " Converting packet from pointer"));
                                                                return [4 /*yield*/, la.ff_copyout_packet(packet)];
                                                            case 4:
                                                                packet = _l.sent();
                                                                _l.label = 5;
                                                            case 5:
                                                                if (stream.codec_type === la.AVMEDIA_TYPE_VIDEO) {
                                                                    evd = packetToEncodedVideoChunk(packet, packet);
                                                                    wcd_3.decode(evd);
                                                                    console.log('vDecode called');
                                                                }
                                                                else {
                                                                    ead = packetToEncodedAudioChunk(packet, packet);
                                                                    wcd_3.decode(ead);
                                                                    console.log('aDecode called');
                                                                }
                                                                console.log(wcd_3.decodeQueueSize);
                                                                _l.label = 6;
                                                            case 6:
                                                                if (!(wcd_3.decodeQueueSize > 10)) return [3 /*break*/, 8];
                                                                console.log("inner loop wait");
                                                                return [4 /*yield*/, new Promise(function (res) { return wcd_3.ondequeue = res; })];
                                                            case 7:
                                                                _l.sent();
                                                                return [3 /*break*/, 6];
                                                            case 8:
                                                                _k++;
                                                                return [3 /*break*/, 3];
                                                            case 9: return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                this_2 = this;
                                                i = 0;
                                                _f.label = 23;
                                            case 23:
                                                if (!(i < streams.length)) return [3 /*break*/, 26];
                                                return [5 /*yield**/, _loop_3(i)];
                                            case 24:
                                                _f.sent();
                                                _f.label = 25;
                                            case 25:
                                                i++;
                                                return [3 /*break*/, 23];
                                            case 26: return [3 /*break*/, 0];
                                            case 27: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Decoder.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a decoder.
         */
        Decoder.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new Decoder(!!init.ptr, libav, input);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return Decoder;
    }());
    /**
     * @private
     * Try to get a VideoDecoder instance for this stream.
     */
    function tryVideoDecoder(la, streamIndex, stream, decodeQueue, decodeErr) {
        return __awaiter(this, void 0, void 0, function () {
            var config, dec, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, videoStreamToConfig(la, stream)];
                    case 1:
                        config = _a.sent();
                        dec = new VideoDecoder({
                            output: function (x) { return decodeQueue.push({
                                streamIndex: streamIndex,
                                frame: x
                            }); },
                            error: function (x) { return decodeErr(x); }
                        });
                        config.optimizeForLatency = true;
                        dec.configure(config);
                        return [2 /*return*/, dec];
                    case 2:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * @private
     * Try to get an AudioDecoder instance for this stream.
     */
    function tryAudioDecoder(la, streamIndex, stream, decodeQueue, decodeErr) {
        return __awaiter(this, void 0, void 0, function () {
            var config, dec, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, audioStreamToConfig(la, stream)];
                    case 1:
                        config = _a.sent();
                        dec = new AudioDecoder({
                            output: function (x) { return decodeQueue.push({
                                streamIndex: streamIndex,
                                frame: x
                            }); },
                            error: function (x) { return decodeErr(x); }
                        });
                        dec.configure(config);
                        return [2 /*return*/, dec];
                    case 2:
                        ex_2 = _a.sent();
                        console.log(ex_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Frame selector.
     */
    var FrameSelector = /** @class */ (function () {
        function FrameSelector(
        /**
         * @private
         * LibAV instance.
         */
        _libav, 
        /**
         * @private
         * Input stream.
         */
        _inputP, 
        /**
         * @private
         * Stream selection.
         */
        _sel) {
            this._libav = _libav;
            this._inputP = _inputP;
            this._sel = _sel;
            this.component = "frame-selector";
            this.streamType = "frame";
            this.ptr = false;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Frame selectors must be initialized.
         */
        FrameSelector.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var la, input, streams, mapping, rdr, outStreams, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            this.ptr = input.ptr;
                            return [4 /*yield*/, input.streams];
                        case 2:
                            streams = _a.sent();
                            return [4 /*yield*/, mkMapping(streams, this._sel)];
                        case 3:
                            mapping = _a.sent();
                            rdr = input.stream.getReader();
                            outStreams = [];
                            for (i = 0; i < mapping.length; i++) {
                                if (mapping[i] >= 0)
                                    outStreams.push(streams[mapping[i]]);
                            }
                            this.streams = Promise.resolve(outStreams);
                            this.stream = new ReadableStream({
                                pull: function (controller) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var rd, outFrames, _i, _a, frame, outStreamIndex;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    return [4 /*yield*/, rdr.read()];
                                                case 1:
                                                    rd = _b.sent();
                                                    if (rd.done) {
                                                        controller.close();
                                                        return [3 /*break*/, 9];
                                                    }
                                                    outFrames = [];
                                                    _i = 0, _a = rd.value;
                                                    _b.label = 2;
                                                case 2:
                                                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                                                    frame = _a[_i];
                                                    outStreamIndex = mapping[frame.streamIndex];
                                                    if (!(outStreamIndex < 0)) return [3 /*break*/, 6];
                                                    if (!(typeof frame.frame === "number")) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, la.av_frame_free_js(frame.frame)];
                                                case 3:
                                                    _b.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    if (frame.frame.close)
                                                        frame.frame.close();
                                                    _b.label = 5;
                                                case 5: return [3 /*break*/, 7];
                                                case 6:
                                                    frame.streamIndex = outStreamIndex;
                                                    outFrames.push(frame);
                                                    _b.label = 7;
                                                case 7:
                                                    _i++;
                                                    return [3 /*break*/, 2];
                                                case 8:
                                                    if (outFrames.length) {
                                                        controller.enqueue(outFrames);
                                                        return [3 /*break*/, 9];
                                                    }
                                                    return [3 /*break*/, 0];
                                                case 9: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        FrameSelector.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a frame selector.
         */
        FrameSelector.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new FrameSelector(libav, input, init.selection);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return FrameSelector;
    }());

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Class for normalizing frames in various formats into LibAV.
     */
    var FrameNormalizer = /** @class */ (function () {
        function FrameNormalizer(ptr, 
        /**
         * @private
         * LibAV instance.
         */
        _libav, 
        /**
         * @private
         * Input frames.
         */
        _inputP) {
            this._libav = _libav;
            this._inputP = _inputP;
            this.component = "frame-normalizer";
            this.streamType = "libav-frame";
            this.ptr = ptr;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Normalizers must be initialized.
         */
        FrameNormalizer.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var la, input, packetStream;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            packetStream = input.stream.getReader();
                            this.streams = input.streams;
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var rd, outFrames, pushFrame, _i, _a, streamFrame, frame, vf, laFrame, af, laFrame;
                                    var _this = this;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, packetStream.read()];
                                            case 1:
                                                rd = _b.sent();
                                                if (rd.done) {
                                                    controller.close();
                                                    return [2 /*return*/];
                                                }
                                                outFrames = [];
                                                pushFrame = function (streamIndex, frame) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _a, _b, frm;
                                                    var _c;
                                                    return __generator(this, function (_d) {
                                                        switch (_d.label) {
                                                            case 0:
                                                                if (!(typeof frame === "number")) return [3 /*break*/, 5];
                                                                if (!!this.ptr) return [3 /*break*/, 3];
                                                                _b = (_a = outFrames).push;
                                                                _c = {
                                                                    streamIndex: streamIndex
                                                                };
                                                                return [4 /*yield*/, la.ff_copyout_frame(frame)];
                                                            case 1:
                                                                _b.apply(_a, [(_c.frame = _d.sent(),
                                                                        _c)]);
                                                                return [4 /*yield*/, la.av_frame_free_js(frame)];
                                                            case 2:
                                                                _d.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                outFrames.push({
                                                                    streamIndex: streamIndex,
                                                                    frame: frame
                                                                });
                                                                _d.label = 4;
                                                            case 4: return [3 /*break*/, 9];
                                                            case 5:
                                                                if (!this.ptr) return [3 /*break*/, 8];
                                                                return [4 /*yield*/, la.av_frame_alloc()];
                                                            case 6:
                                                                frm = _d.sent();
                                                                return [4 /*yield*/, la.ff_copyin_frame(frm, frame)];
                                                            case 7:
                                                                _d.sent();
                                                                outFrames.push({
                                                                    streamIndex: streamIndex,
                                                                    frame: frm
                                                                });
                                                                return [3 /*break*/, 9];
                                                            case 8:
                                                                outFrames.push({
                                                                    streamIndex: streamIndex,
                                                                    frame: frame
                                                                });
                                                                _d.label = 9;
                                                            case 9: return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                _i = 0, _a = rd.value;
                                                _b.label = 2;
                                            case 2:
                                                if (!(_i < _a.length)) return [3 /*break*/, 11];
                                                streamFrame = _a[_i];
                                                frame = streamFrame.frame;
                                                if (!frame.codedWidth) return [3 /*break*/, 5];
                                                vf = frame;
                                                return [4 /*yield*/, videoFrameToLAFrame(vf)];
                                            case 3:
                                                laFrame = _b.sent();
                                                vf.close();
                                                return [4 /*yield*/, pushFrame(streamFrame.streamIndex, laFrame)];
                                            case 4:
                                                _b.sent();
                                                return [3 /*break*/, 10];
                                            case 5:
                                                if (!frame.sampleRate) return [3 /*break*/, 8];
                                                af = frame;
                                                return [4 /*yield*/, audioDataToLAFrame(af)];
                                            case 6:
                                                laFrame = _b.sent();
                                                af.close();
                                                return [4 /*yield*/, pushFrame(streamFrame.streamIndex, laFrame)];
                                            case 7:
                                                _b.sent();
                                                return [3 /*break*/, 10];
                                            case 8: return [4 /*yield*/, pushFrame(streamFrame.streamIndex, frame)];
                                            case 9:
                                                _b.sent();
                                                _b.label = 10;
                                            case 10:
                                                _i++;
                                                return [3 /*break*/, 2];
                                            case 11:
                                                controller.enqueue(outFrames);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        FrameNormalizer.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a normalizer.
         */
        FrameNormalizer.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new FrameNormalizer(!!init.ptr, libav, input);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return FrameNormalizer;
    }());

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Class for normalizing frames into the formats most suitable for playback.
     */
    var PlaybackNormalizer = /** @class */ (function () {
        function PlaybackNormalizer(
        /**
         * @private
         * Playback sample rate.
         */
        _sampleRate, 
        /**
         * @private
         * LibAV instance.
         */
        _libav, 
        /**
         * @private
         * Input frames.
         */
        _inputP) {
            this._sampleRate = _sampleRate;
            this._libav = _libav;
            this._inputP = _inputP;
            this.component = "play-normalizer";
            this.streamType = "frame";
            this.ptr = false;
            /**
             * @private
             * Filtergraphs for audio conversion.
             */
            this._filterGraph = {};
            this._bufferSource = {};
            this._bufferSink = {};
            /**
             * @private
             * Software scaler instances.
             */
            this._sws = {};
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
            this._frame = 0;
            this._outFrame = 0;
        }
        /**
         * @private
         * Normalizers must be initialized.
         */
        PlaybackNormalizer.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var la, input, packetStream, _a, _b;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _c.sent();
                            packetStream = input.stream.getReader();
                            this.streams = input.streams;
                            _a = this;
                            return [4 /*yield*/, la.av_frame_alloc()];
                        case 2:
                            _a._frame = _c.sent();
                            _b = this;
                            return [4 /*yield*/, la.av_frame_alloc()];
                        case 3:
                            _b._outFrame = _c.sent();
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var rd, _a, _b, _c, _i, idx, _d, _e, _f, _g, idx, outFrames, toFLTP, _h, _j, streamFrame, frame, af, laFrame, laFrame, vf, sws, id, _k;
                                    var _this = this;
                                    return __generator(this, function (_l) {
                                        switch (_l.label) {
                                            case 0: return [4 /*yield*/, packetStream.read()];
                                            case 1:
                                                rd = _l.sent();
                                                if (!rd.done) return [3 /*break*/, 12];
                                                controller.close();
                                                // Clean up our allocations
                                                return [4 /*yield*/, la.av_frame_free_js(this._frame)];
                                            case 2:
                                                // Clean up our allocations
                                                _l.sent();
                                                return [4 /*yield*/, la.av_frame_free_js(this._outFrame)];
                                            case 3:
                                                _l.sent();
                                                _a = this._filterGraph;
                                                _b = [];
                                                for (_c in _a)
                                                    _b.push(_c);
                                                _i = 0;
                                                _l.label = 4;
                                            case 4:
                                                if (!(_i < _b.length)) return [3 /*break*/, 7];
                                                _c = _b[_i];
                                                if (!(_c in _a)) return [3 /*break*/, 6];
                                                idx = _c;
                                                return [4 /*yield*/, la.avfilter_graph_free_js(this._filterGraph[idx])];
                                            case 5:
                                                _l.sent();
                                                _l.label = 6;
                                            case 6:
                                                _i++;
                                                return [3 /*break*/, 4];
                                            case 7:
                                                _d = this._sws;
                                                _e = [];
                                                for (_f in _d)
                                                    _e.push(_f);
                                                _g = 0;
                                                _l.label = 8;
                                            case 8:
                                                if (!(_g < _e.length)) return [3 /*break*/, 11];
                                                _f = _e[_g];
                                                if (!(_f in _d)) return [3 /*break*/, 10];
                                                idx = _f;
                                                return [4 /*yield*/, la.sws_freeContext(this._sws[idx])];
                                            case 9:
                                                _l.sent();
                                                _l.label = 10;
                                            case 10:
                                                _g++;
                                                return [3 /*break*/, 8];
                                            case 11: return [2 /*return*/];
                                            case 12:
                                                outFrames = [];
                                                toFLTP = function (idx, frame) { return __awaiter(_this, void 0, void 0, function () {
                                                    var graph, channelLayout, _a, filterGraph, src_1, sink_1, src, sink, fframes, _i, fframes_1, frame_1;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                if (frame.format === la.AV_SAMPLE_FMT_FLTP &&
                                                                    frame.sample_rate === this._sampleRate) {
                                                                    outFrames.push({
                                                                        streamIndex: idx,
                                                                        frame: frame
                                                                    });
                                                                    return [2 /*return*/];
                                                                }
                                                                graph = this._filterGraph[idx];
                                                                if (!!graph) return [3 /*break*/, 2];
                                                                channelLayout = 4;
                                                                if (frame.channel_layout)
                                                                    channelLayout = frame.channel_layout;
                                                                else if (frame.channels && frame.channels !== 1)
                                                                    channelLayout = (1 << frame.channels) - 1;
                                                                return [4 /*yield*/, la.ff_init_filter_graph("aresample", {
                                                                        type: la.AVMEDIA_TYPE_AUDIO,
                                                                        sample_fmt: frame.format,
                                                                        sample_rate: frame.sample_rate,
                                                                        channel_layout: channelLayout,
                                                                        time_base: frame.time_base_num
                                                                            ? [frame.time_base_num, frame.time_base_den]
                                                                            : void 0
                                                                    }, {
                                                                        type: la.AVMEDIA_TYPE_AUDIO,
                                                                        sample_fmt: la.AV_SAMPLE_FMT_FLTP,
                                                                        sample_rate: this._sampleRate,
                                                                        channel_layout: channelLayout
                                                                    })];
                                                            case 1:
                                                                _a = _b.sent(), filterGraph = _a[0], src_1 = _a[1], sink_1 = _a[2];
                                                                this._filterGraph[idx] = graph = filterGraph;
                                                                this._bufferSource[idx] = src_1;
                                                                this._bufferSink[idx] = sink_1;
                                                                _b.label = 2;
                                                            case 2:
                                                                src = this._bufferSource[idx];
                                                                sink = this._bufferSink[idx];
                                                                return [4 /*yield*/, la.ff_filter_multi(src, sink, this._frame, [frame])];
                                                            case 3:
                                                                fframes = _b.sent();
                                                                for (_i = 0, fframes_1 = fframes; _i < fframes_1.length; _i++) {
                                                                    frame_1 = fframes_1[_i];
                                                                    outFrames.push({
                                                                        streamIndex: idx,
                                                                        frame: frame_1
                                                                    });
                                                                }
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                _h = 0, _j = rd.value;
                                                _l.label = 13;
                                            case 13:
                                                if (!(_h < _j.length)) return [3 /*break*/, 34];
                                                streamFrame = _j[_h];
                                                frame = streamFrame.frame;
                                                if (!frame.codedWidth) return [3 /*break*/, 14];
                                                // Video frames are already playable
                                                outFrames.push(streamFrame);
                                                return [3 /*break*/, 33];
                                            case 14:
                                                if (!frame.sampleRate) return [3 /*break*/, 17];
                                                af = frame;
                                                return [4 /*yield*/, audioDataToLAFrame(af)];
                                            case 15:
                                                laFrame = _l.sent();
                                                return [4 /*yield*/, toFLTP(streamFrame.streamIndex, laFrame)];
                                            case 16:
                                                _l.sent();
                                                return [3 /*break*/, 33];
                                            case 17:
                                                laFrame = frame;
                                                if (!(typeof frame === "number")) return [3 /*break*/, 19];
                                                return [4 /*yield*/, la.ff_copyout_frame(frame)];
                                            case 18:
                                                laFrame = _l.sent();
                                                _l.label = 19;
                                            case 19:
                                                if (!laFrame.width) return [3 /*break*/, 31];
                                                if (!(typeof VideoFrame !== "undefined")) return [3 /*break*/, 21];
                                                return [4 /*yield*/, laFrameToVideoFrame(laFrame, { transfer: true })];
                                            case 20:
                                                vf = _l.sent();
                                                outFrames.push({
                                                    streamIndex: streamFrame.streamIndex,
                                                    frame: vf
                                                });
                                                return [3 /*break*/, 30];
                                            case 21:
                                                sws = this._sws[streamFrame.streamIndex];
                                                if (!!sws) return [3 /*break*/, 23];
                                                return [4 /*yield*/, la.sws_getContext(laFrame.width, laFrame.height, laFrame.format, laFrame.width, laFrame.height, la.AV_PIX_FMT_RGBA, 0, 0, 0, 0)];
                                            case 22:
                                                // Create a scalar instance
                                                sws = _l.sent();
                                                this._sws[streamFrame.streamIndex] = sws;
                                                _l.label = 23;
                                            case 23: return [4 /*yield*/, la.av_frame_unref(this._frame)];
                                            case 24:
                                                _l.sent();
                                                return [4 /*yield*/, la.av_frame_unref(this._outFrame)];
                                            case 25:
                                                _l.sent();
                                                return [4 /*yield*/, la.ff_copyin_frame(this._frame, laFrame)];
                                            case 26:
                                                _l.sent();
                                                // FIXME: Check for errors
                                                return [4 /*yield*/, la.sws_scale_frame(sws, this._outFrame, this._frame)];
                                            case 27:
                                                // FIXME: Check for errors
                                                _l.sent();
                                                return [4 /*yield*/, la.ff_copyout_frame_video_imagedata(this._outFrame)];
                                            case 28:
                                                id = _l.sent();
                                                _k = laFrame;
                                                return [4 /*yield*/, createImageBitmap(id)];
                                            case 29:
                                                _k.data = _l.sent();
                                                outFrames.push({
                                                    streamIndex: streamFrame.streamIndex,
                                                    frame: laFrame
                                                });
                                                _l.label = 30;
                                            case 30: return [3 /*break*/, 33];
                                            case 31: 
                                            // Audio frame
                                            return [4 /*yield*/, toFLTP(streamFrame.streamIndex, laFrame)];
                                            case 32:
                                                // Audio frame
                                                _l.sent();
                                                _l.label = 33;
                                            case 33:
                                                _h++;
                                                return [3 /*break*/, 13];
                                            case 34:
                                                controller.enqueue(outFrames);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        PlaybackNormalizer.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a playback normalizer.
         */
        PlaybackNormalizer.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new PlaybackNormalizer(init.sampleRate, libav, input);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return PlaybackNormalizer;
    }());

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Frontend for libav filters.
     */
    var LAFilter = /** @class */ (function () {
        function LAFilter(
        /**
         * @private
         * libav.js instance.
         */
        _libav, 
        /**
         * @private
         * Initializers (for filtergraph descriptions).
         */
        _init, 
        /**
         * @private
         * Demuxed input.
         */
        _rawInputP) {
            this._libav = _libav;
            this._init = _init;
            this._rawInputP = _rawInputP;
            this.component = "la-filter";
            this.streamType = "libav-frame";
            this.ptr = !!_init.ptr;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Filters must be initialized.
         */
        LAFilter.prototype._initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                function cleanup() {
                    return __awaiter(this, void 0, void 0, function () {
                        var _i, destructors_1, destructor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _i = 0, destructors_1 = destructors;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < destructors_1.length)) return [3 /*break*/, 4];
                                    destructor = destructors_1[_i];
                                    return [4 /*yield*/, destructor()];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
                var la, rawInput, input, streams, frameStream, frame, destructors, filters;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._rawInputP];
                        case 1:
                            rawInput = _a.sent();
                            if (!(rawInput.streamType !== "libav-frame")) return [3 /*break*/, 3];
                            return [4 /*yield*/, FrameNormalizer.build(la, {
                                    type: "frame-normalizer",
                                    ptr: true,
                                    input: rawInput
                                }, this._rawInputP)];
                        case 2:
                            // Need to convert the frames to libav first
                            input = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            input = rawInput;
                            _a.label = 4;
                        case 4:
                            this.streams = input.streams;
                            return [4 /*yield*/, input.streams];
                        case 5:
                            streams = _a.sent();
                            frameStream = input.stream.getReader();
                            return [4 /*yield*/, la.av_frame_alloc()];
                        case 6:
                            frame = _a.sent();
                            destructors = [];
                            destructors.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, la.av_frame_free_js(frame)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            filters = {};
                            // Create the stream
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var inFrameData, eof, inFrames, framesByStr, _i, inFrames_1, frame_1, streamIndex, ret, _loop_1, this_1, i;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                return [4 /*yield*/, frameStream.read()];
                                            case 1:
                                                inFrameData = _a.sent();
                                                eof = inFrameData.done;
                                                inFrames = inFrameData.value || [];
                                                framesByStr = {};
                                                for (_i = 0, inFrames_1 = inFrames; _i < inFrames_1.length; _i++) {
                                                    frame_1 = inFrames_1[_i];
                                                    streamIndex = frame_1.streamIndex;
                                                    framesByStr[streamIndex] = framesByStr[streamIndex] || [];
                                                    framesByStr[streamIndex].push(frame_1.frame);
                                                }
                                                ret = [];
                                                _loop_1 = function (i) {
                                                    var frames_1, descr, ios, _b, _c, _d, bufferSrc, bufferSink, ffs;
                                                    return __generator(this, function (_e) {
                                                        switch (_e.label) {
                                                            case 0:
                                                                if (!framesByStr[i])
                                                                    return [2 /*return*/, "continue"];
                                                                frames_1 = framesByStr[i];
                                                                if (!!filters[i]) return [3 /*break*/, 2];
                                                                descr = void 0;
                                                                ios = void 0;
                                                                if (streams[i].codec_type === la.AVMEDIA_TYPE_VIDEO) {
                                                                    descr = this_1._init.videoFilters || "null";
                                                                    ios = this_1._init.videoIOSettings || {};
                                                                }
                                                                else {
                                                                    descr = this_1._init.audioFilters || "aresample";
                                                                    ios = this_1._init.audioIOSettings || {};
                                                                }
                                                                _b = filters;
                                                                _c = i;
                                                                return [4 /*yield*/, mkFilter$1(la, descr, ios, streams[i], frames_1[0])];
                                                            case 1:
                                                                _b[_c] = _e.sent();
                                                                destructors.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0: return [4 /*yield*/, la.avfilter_graph_free_js(filters[i][0])];
                                                                            case 1:
                                                                                _a.sent();
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                _e.label = 2;
                                                            case 2:
                                                                _d = filters[i], bufferSrc = _d[1], bufferSink = _d[2];
                                                                return [4 /*yield*/, la.ff_filter_multi(bufferSrc, bufferSink, frame, frames_1, {
                                                                        fin: eof,
                                                                        copyoutFrame: (this_1._init.ptr ? "ptr" : "default")
                                                                    })];
                                                            case 3:
                                                                ffs = _e.sent();
                                                                ret.push.apply(ret, ffs.map(function (x) { return ({
                                                                    streamIndex: i,
                                                                    frame: x
                                                                }); }));
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                this_1 = this;
                                                i = 0;
                                                _a.label = 2;
                                            case 2:
                                                if (!(i < streams.length)) return [3 /*break*/, 5];
                                                return [5 /*yield**/, _loop_1(i)];
                                            case 3:
                                                _a.sent();
                                                _a.label = 4;
                                            case 4:
                                                i++;
                                                return [3 /*break*/, 2];
                                            case 5:
                                                if (ret.length) {
                                                    // FIXME: Make sure they're still in temporal order
                                                    controller.enqueue(ret);
                                                }
                                                if (!eof) return [3 /*break*/, 7];
                                                return [4 /*yield*/, cleanup()];
                                            case 6:
                                                _a.sent();
                                                controller.close();
                                                _a.label = 7;
                                            case 7:
                                                if (ret.length || eof)
                                                    return [3 /*break*/, 8];
                                                return [3 /*break*/, 0];
                                            case 8: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        LAFilter.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._rawInputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a encoder.
         */
        LAFilter.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new LAFilter(libav, init, input);
                            return [4 /*yield*/, ret._initialize()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return LAFilter;
    }());
    /**
     * @private
     * Make the given filter.
     */
    function mkFilter$1(la, descr, ios, stream, frameIn) {
        return __awaiter(this, void 0, void 0, function () {
            var frame, oios, channelLayout, oios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof frameIn === "number")) return [3 /*break*/, 2];
                        return [4 /*yield*/, la.ff_copyout_frame(frameIn)];
                    case 1:
                        frame = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        frame = frameIn;
                        _a.label = 3;
                    case 3:
                        if (!(stream.codec_type === la.AVMEDIA_TYPE_VIDEO)) return [3 /*break*/, 5];
                        oios = {
                            type: la.AVMEDIA_TYPE_VIDEO,
                            width: frame.width,
                            height: frame.height,
                            pix_fmt: frame.format,
                            time_base: frame.time_base_num
                                ? [frame.time_base_num, frame.time_base_den]
                                : [1, 1000000]
                        };
                        Object.assign(oios, ios);
                        return [4 /*yield*/, la.ff_init_filter_graph(descr, {
                                type: la.AVMEDIA_TYPE_VIDEO,
                                width: frame.width,
                                height: frame.height,
                                pix_fmt: frame.format,
                                time_base: frame.time_base_num
                                    ? [frame.time_base_num, frame.time_base_den]
                                    : void 0
                            }, oios)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        channelLayout = 4;
                        if (frame.channel_layout)
                            channelLayout = frame.channel_layout;
                        else if (frame.channels && frame.channels !== 1)
                            channelLayout = (1 << frame.channels) - 1;
                        oios = {
                            sample_rate: frame.sample_rate,
                            channel_layout: channelLayout,
                            sample_fmt: frame.format,
                            time_base: [1, frame.sample_rate]
                        };
                        Object.assign(oios, ios);
                        return [4 /*yield*/, la.ff_init_filter_graph(descr, {
                                sample_rate: frame.sample_rate,
                                channel_layout: channelLayout,
                                sample_fmt: frame.format,
                                time_base: frame.time_base_num
                                    ? [frame.time_base_num, frame.time_base_den]
                                    : void 0
                            }, oios)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * A multi-encoder, consisting of encoders for any number of streams.
     */
    var Encoder = /** @class */ (function () {
        function Encoder(
        /**
         * @private
         * libav.js instance.
         */
        _libav, 
        /**
         * @private
         * Initializer for this encoder (for configurations).
         */
        _init, 
        /**
         * @private
         * Demuxed input.
         */
        _inputP) {
            this._libav = _libav;
            this._init = _init;
            this._inputP = _inputP;
            this.component = "encoder";
            this.streamType = "packet";
            this.ptr = !!_init.ptr;
            this.stream = new ReadableStream({});
            this.streams = Promise.resolve([]);
        }
        /**
         * @private
         * Encoders must be initialized.
         */
        Encoder.prototype._initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                function cleanup() {
                    return __awaiter(this, void 0, void 0, function () {
                        var _i, destructors_1, destructor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _i = 0, destructors_1 = destructors;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < destructors_1.length)) return [3 /*break*/, 4];
                                    destructor = destructors_1[_i];
                                    return [4 /*yield*/, destructor()];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                }
                function setEncodeErr(x) { encodeErr = x; console.log(encodeErr); }
                var la, input, inputStreams, frameStream, frameEOF, destructors, encodeQueue, encodeErr, streams, encoders, filters, _loop_1, this_1, streamIndex;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [4 /*yield*/, input.streams];
                        case 2:
                            inputStreams = _a.sent();
                            frameStream = input.stream.getReader();
                            frameEOF = false;
                            destructors = [];
                            encodeQueue = [];
                            encodeErr = null;
                            streams = [];
                            encoders = [];
                            filters = {};
                            _loop_1 = function (streamIndex) {
                                var inputStream, wce_1, wce_2, codecpar, config, str, br, config, str, br, laei, ctx, options, key, _b, lae, _c, _d, codecparPtr, spar, _e, _f;
                                return __generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0:
                                            inputStream = inputStreams[streamIndex];
                                            if (!(inputStream.codec_type === la.AVMEDIA_TYPE_VIDEO)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, tryVideoEncoder(la, this_1._init.videoConfig, streamIndex, inputStream, encodeQueue, setEncodeErr)];
                                        case 1:
                                            wce_1 = _g.sent();
                                            if (wce_1) {
                                                streams.push(wce_1[0]);
                                                encoders.push(wce_1[1]);
                                                destructors.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    return [2 /*return*/, wce_1[1].close()];
                                                }); }); });
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [3 /*break*/, 5];
                                        case 2:
                                            if (!(inputStream.codec_type === la.AVMEDIA_TYPE_AUDIO)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, tryAudioEncoder(la, this_1._init.audioConfig, streamIndex, inputStream, encodeQueue, setEncodeErr)];
                                        case 3:
                                            wce_2 = _g.sent();
                                            if (wce_2) {
                                                streams.push(wce_2[0]);
                                                encoders.push(wce_2[1]);
                                                destructors.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    return [2 /*return*/, wce_2[1].close()];
                                                }); }); });
                                                return [2 /*return*/, "continue"];
                                            }
                                            return [3 /*break*/, 5];
                                        case 4:
                                            // Unsupported stream type
                                            encoders.push(null);
                                            return [2 /*return*/, "continue"];
                                        case 5:
                                            codecpar = void 0;
                                            if (!(inputStream.codec_type === la.AVMEDIA_TYPE_VIDEO)) return [3 /*break*/, 12];
                                            if (!this_1._init.libavVideoConfig) return [3 /*break*/, 6];
                                            codecpar = this_1._init.libavVideoConfig;
                                            return [3 /*break*/, 11];
                                        case 6:
                                            if (!this_1._init.videoConfig) return [3 /*break*/, 10];
                                            config = this_1._init.videoConfig;
                                            return [4 /*yield*/, configToVideoStream(la, config)];
                                        case 7:
                                            str = _g.sent();
                                            return [4 /*yield*/, la.ff_copyout_codecpar(str[0])];
                                        case 8:
                                            codecpar = _g.sent();
                                            return [4 /*yield*/, la.avcodec_parameters_free_js(str[0])];
                                        case 9:
                                            _g.sent();
                                            if (config.bitrate) {
                                                br = la.f64toi64(config.bitrate);
                                                codecpar.bit_rate = br[0];
                                                codecpar.bit_ratehi = br[1];
                                            }
                                            return [3 /*break*/, 11];
                                        case 10: throw new Error("Video stream with no video configuration");
                                        case 11: return [3 /*break*/, 18];
                                        case 12:
                                            if (!this_1._init.libavAudioConfig) return [3 /*break*/, 13];
                                            codecpar = this_1._init.libavAudioConfig;
                                            return [3 /*break*/, 18];
                                        case 13:
                                            if (!this_1._init.audioConfig) return [3 /*break*/, 17];
                                            config = this_1._init.audioConfig;
                                            return [4 /*yield*/, configToAudioStream(la, config)];
                                        case 14:
                                            str = _g.sent();
                                            return [4 /*yield*/, la.ff_copyout_codecpar(str[0])];
                                        case 15:
                                            codecpar = _g.sent();
                                            return [4 /*yield*/, la.avcodec_parameters_free_js(str[0])];
                                        case 16:
                                            _g.sent();
                                            if (config.bitrate) {
                                                br = la.f64toi64(config.bitrate);
                                                codecpar.bit_rate = br[0];
                                                codecpar.bit_ratehi = br[1];
                                            }
                                            return [3 /*break*/, 18];
                                        case 17: throw new Error("Audio stream with no audio configuration");
                                        case 18:
                                            if (!(typeof codecpar === "number")) return [3 /*break*/, 20];
                                            return [4 /*yield*/, la.ff_copyout_codecpar(codecpar)];
                                        case 19:
                                            codecpar = _g.sent();
                                            _g.label = 20;
                                        case 20: return [4 /*yield*/, la.avcodec_find_encoder(codecpar.codec_id)];
                                        case 21:
                                            laei = _g.sent();
                                            ctx = {};
                                            options = Object.create(null);
                                            for (key in codecpar) {
                                                if (la["AVCodecContext_".concat(key, "_s")])
                                                    ctx[key] = codecpar[key];
                                            }
                                            if (codecpar.options)
                                                options = codecpar.options;
                                            if (!(inputStream.codec_type === la.AVMEDIA_TYPE_VIDEO)) return [3 /*break*/, 22];
                                            if (!("pix_fmt" in ctx))
                                                ctx.pix_fmt = la.AV_PIX_FMT_YUV420P; // FIXME
                                            if (!ctx.width)
                                                ctx.width = inputStream.width;
                                            if (!ctx.height)
                                                ctx.height = inputStream.height;
                                            return [3 /*break*/, 25];
                                        case 22:
                                            if (!!("sample_fmt" in ctx)) return [3 /*break*/, 24];
                                            _b = ctx;
                                            return [4 /*yield*/, la.AVCodec_sample_fmts_a(laei, 0)];
                                        case 23:
                                            _b.sample_fmt = _g.sent();
                                            _g.label = 24;
                                        case 24:
                                            if (!ctx.sample_rate)
                                                ctx.sample_rate = inputStream.sample_rate;
                                            if (!ctx.channel_layout)
                                                ctx.channel_layout = inputStream.channel_layoutmask;
                                            _g.label = 25;
                                        case 25:
                                            if (ctx.level < 0)
                                                delete ctx.level;
                                            if (ctx.profile < 0)
                                                delete ctx.profile;
                                            _d = (_c = la).ff_init_encoder;
                                            return [4 /*yield*/, la.AVCodec_name(laei)];
                                        case 26: return [4 /*yield*/, _d.apply(_c, [_g.sent(), {
                                                    ctx: ctx,
                                                    options: options,
                                                    time_base: [1, 1000000]
                                                }])];
                                        case 27:
                                            lae = _g.sent();
                                            encoders.push(lae);
                                            destructors.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, la.ff_free_encoder(lae[1], lae[2], lae[3])];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [4 /*yield*/, la.avcodec_parameters_alloc()];
                                        case 28:
                                            codecparPtr = _g.sent();
                                            return [4 /*yield*/, la.avcodec_parameters_from_context(codecparPtr, lae[1])];
                                        case 29:
                                            _g.sent();
                                            return [4 /*yield*/, la.ff_copyout_codecpar(codecparPtr)];
                                        case 30:
                                            spar = _g.sent();
                                            _e = spar;
                                            return [4 /*yield*/, la.AVCodecContext_time_base_num(lae[1])];
                                        case 31:
                                            _e.time_base_num = _g.sent();
                                            _f = spar;
                                            return [4 /*yield*/, la.AVCodecContext_time_base_den(lae[1])];
                                        case 32:
                                            _f.time_base_den = _g.sent();
                                            streams.push(Promise.resolve(spar));
                                            return [4 /*yield*/, la.avcodec_parameters_free_js(codecparPtr)];
                                        case 33:
                                            _g.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            streamIndex = 0;
                            _a.label = 3;
                        case 3:
                            if (!(streamIndex < inputStreams.length)) return [3 /*break*/, 6];
                            return [5 /*yield**/, _loop_1(streamIndex)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            streamIndex++;
                            return [3 /*break*/, 3];
                        case 6:
                            this.streams = Promise.all(streams);
                            // Create the stream
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var inFrames, i, enc, pkts, _a, c, frame, pkt, ffs, _b, bufferSrc, bufferSink, _i, pkts_1, packet, wce, framesByStr, _c, _d, frame, streamIndex, _loop_2, this_2, i;
                                    var _this = this;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0:
                                                if (!encodeErr) return [3 /*break*/, 2];
                                                console.log('Encode error encountered:', encodeErr);
                                                return [4 /*yield*/, cleanup()];
                                            case 1:
                                                _e.sent();
                                                controller.error(encodeErr);
                                                return [3 /*break*/, 26];
                                            case 2:
                                                if (encodeQueue.length) {
                                                    controller.enqueue(encodeQueue.splice(0, encodeQueue.length));
                                                    return [3 /*break*/, 26];
                                                }
                                                if (!frameEOF) return [3 /*break*/, 4];
                                                console.log('Frame EOF reached');
                                                return [4 /*yield*/, cleanup()];
                                            case 3:
                                                _e.sent();
                                                controller.close();
                                                return [3 /*break*/, 26];
                                            case 4: return [4 /*yield*/, frameStream.read()];
                                            case 5:
                                                inFrames = _e.sent();
                                                if (!inFrames.done) return [3 /*break*/, 21];
                                                frameEOF = true;
                                                i = 0;
                                                _e.label = 6;
                                            case 6:
                                                if (!(i < encoders.length)) return [3 /*break*/, 20];
                                                enc = encoders[i];
                                                if (!enc)
                                                    return [3 /*break*/, 19];
                                                if (!enc.length) return [3 /*break*/, 17];
                                                pkts = void 0;
                                                _a = enc, c = _a[1], frame = _a[2], pkt = _a[3];
                                                ffs = void 0;
                                                if (!filters[i]) return [3 /*break*/, 8];
                                                _b = filters[i], bufferSrc = _b[1], bufferSink = _b[2];
                                                return [4 /*yield*/, la.ff_filter_multi(bufferSrc, bufferSink, frame, [], {
                                                        fin: true,
                                                        copyoutFrame: "ptr"
                                                    })];
                                            case 7:
                                                ffs = _e.sent();
                                                return [3 /*break*/, 9];
                                            case 8:
                                                ffs = [];
                                                _e.label = 9;
                                            case 9: return [4 /*yield*/, la.ff_encode_multi(c, frame, pkt, ffs, {
                                                    fin: true,
                                                    copyoutPacket: (this.ptr ? "ptr" : "default")
                                                })];
                                            case 10:
                                                pkts = _e.sent();
                                                _i = 0, pkts_1 = pkts;
                                                _e.label = 11;
                                            case 11:
                                                if (!(_i < pkts_1.length)) return [3 /*break*/, 16];
                                                packet = pkts_1[_i];
                                                if (!this.ptr) return [3 /*break*/, 13];
                                                return [4 /*yield*/, la.AVPacket_stream_index_s(packet, i)];
                                            case 12:
                                                _e.sent();
                                                return [3 /*break*/, 14];
                                            case 13:
                                                packet.stream_index = i;
                                                _e.label = 14;
                                            case 14:
                                                encodeQueue.push(packet);
                                                _e.label = 15;
                                            case 15:
                                                _i++;
                                                return [3 /*break*/, 11];
                                            case 16: return [3 /*break*/, 19];
                                            case 17:
                                                wce = enc;
                                                return [4 /*yield*/, wce.flush()];
                                            case 18:
                                                _e.sent();
                                                _e.label = 19;
                                            case 19:
                                                i++;
                                                return [3 /*break*/, 6];
                                            case 20: return [3 /*break*/, 0];
                                            case 21:
                                                framesByStr = {};
                                                for (_c = 0, _d = inFrames.value; _c < _d.length; _c++) {
                                                    frame = _d[_c];
                                                    streamIndex = frame.streamIndex;
                                                    if (!encoders[streamIndex])
                                                        continue;
                                                    framesByStr[streamIndex] = framesByStr[streamIndex] || [];
                                                    framesByStr[streamIndex].push(frame.frame);
                                                }
                                                _loop_2 = function (i) {
                                                    var frames_1, enc, _f, c, frame, pkt, _g, _h, _j, _k, _l, bufferSrc, bufferSink, ffs, res, _m, res_1, pkt_1, wce_3, _o, _p, frame;
                                                    return __generator(this, function (_q) {
                                                        switch (_q.label) {
                                                            case 0:
                                                                if (!framesByStr[i] || !encoders[i])
                                                                    return [2 /*return*/, "continue"];
                                                                frames_1 = framesByStr[i];
                                                                enc = encoders[i];
                                                                if (!enc.length) return [3 /*break*/, 13];
                                                                _f = enc, c = _f[1], frame = _f[2], pkt = _f[3];
                                                                return [4 /*yield*/, libavifyFrames(la, frames_1)];
                                                            case 1:
                                                                _q.sent();
                                                                if (!!filters[i]) return [3 /*break*/, 4];
                                                                _g = filters;
                                                                _h = i;
                                                                _j = mkFilter;
                                                                _k = [la, c];
                                                                return [4 /*yield*/, streams[i]];
                                                            case 2: return [4 /*yield*/, _j.apply(void 0, _k.concat([_q.sent(), frames_1[0]]))];
                                                            case 3:
                                                                _g[_h] = _q.sent();
                                                                destructors.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0: return [4 /*yield*/, la.avfilter_graph_free_js(filters[i][0])];
                                                                            case 1:
                                                                                _a.sent();
                                                                                return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                                _q.label = 4;
                                                            case 4:
                                                                _l = filters[i], bufferSrc = _l[1], bufferSink = _l[2];
                                                                return [4 /*yield*/, la.ff_filter_multi(bufferSrc, bufferSink, frame, frames_1, {
                                                                        copyoutFrame: "ptr"
                                                                    })];
                                                            case 5:
                                                                ffs = _q.sent();
                                                                return [4 /*yield*/, la.ff_encode_multi(c, frame, pkt, ffs, {
                                                                        copyoutPacket: (this_2.ptr ? "ptr" : "default")
                                                                    })];
                                                            case 6:
                                                                res = _q.sent();
                                                                _m = 0, res_1 = res;
                                                                _q.label = 7;
                                                            case 7:
                                                                if (!(_m < res_1.length)) return [3 /*break*/, 12];
                                                                pkt_1 = res_1[_m];
                                                                if (!this_2.ptr) return [3 /*break*/, 9];
                                                                return [4 /*yield*/, la.AVPacket_stream_index_s(pkt_1, i)];
                                                            case 8:
                                                                _q.sent();
                                                                return [3 /*break*/, 10];
                                                            case 9:
                                                                pkt_1.stream_index = i;
                                                                _q.label = 10;
                                                            case 10:
                                                                encodeQueue.push(pkt_1);
                                                                _q.label = 11;
                                                            case 11:
                                                                _m++;
                                                                return [3 /*break*/, 7];
                                                            case 12: return [3 /*break*/, 19];
                                                            case 13:
                                                                wce_3 = enc;
                                                                return [4 /*yield*/, webcodecsifyFrames(la, frames_1)];
                                                            case 14:
                                                                _q.sent();
                                                                _o = 0, _p = frames_1;
                                                                _q.label = 15;
                                                            case 15:
                                                                if (!(_o < _p.length)) return [3 /*break*/, 19];
                                                                frame = _p[_o];
                                                                wce_3.encode(frame);
                                                                frame.close();
                                                                console.log("EncQ ".concat(wce_3.encodeQueueSize));
                                                                _q.label = 16;
                                                            case 16:
                                                                if (!(wce_3.encodeQueueSize > 30)) return [3 /*break*/, 18];
                                                                return [4 /*yield*/, new Promise(function (res) { return wce_3.ondequeue = res; })];
                                                            case 17:
                                                                _q.sent();
                                                                return [3 /*break*/, 16];
                                                            case 18:
                                                                _o++;
                                                                return [3 /*break*/, 15];
                                                            case 19: return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                this_2 = this;
                                                i = 0;
                                                _e.label = 22;
                                            case 22:
                                                if (!(i < streams.length)) return [3 /*break*/, 25];
                                                return [5 /*yield**/, _loop_2(i)];
                                            case 23:
                                                _e.sent();
                                                _e.label = 24;
                                            case 24:
                                                i++;
                                                return [3 /*break*/, 22];
                                            case 25: return [3 /*break*/, 0];
                                            case 26: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Encoder.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a encoder.
         */
        Encoder.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new Encoder(libav, init, input);
                            return [4 /*yield*/, ret._initialize()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return Encoder;
    }());
    /**
     * @private
     * Try to get a VideoEncoder instance for this stream.
     */
    function tryVideoEncoder(la, configAny, streamIndex, inStream, encodeQueue, encodeErr) {
        return __awaiter(this, void 0, void 0, function () {
            var p_1, config, stream_1, sparRes_1, sparP, enc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!configAny || !configAny.codec) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        p_1 = Promise.all([]);
                        config = configAny;
                        if (!config.width)
                            config.width = inStream.width;
                        if (!config.height)
                            config.height = inStream.height;
                        return [4 /*yield*/, configToVideoStream(la, config)];
                    case 2:
                        stream_1 = _a.sent();
                        sparRes_1 = null;
                        sparP = new Promise(function (res) { return sparRes_1 = res; });
                        enc = new VideoEncoder({
                            output: function (chunk, metadata) {
                                // FIXME: Force waiting for the final promise
                                p_1 = p_1.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var pkt, spar;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, encodedVideoChunkToPacket(la, chunk, metadata, stream_1, streamIndex)];
                                            case 1:
                                                pkt = _a.sent();
                                                encodeQueue.push(pkt);
                                                if (!sparRes_1) return [3 /*break*/, 3];
                                                return [4 /*yield*/, la.ff_copyout_codecpar(stream_1[0])];
                                            case 2:
                                                spar = _a.sent();
                                                spar.time_base_num = 1;
                                                spar.time_base_den = 1000000;
                                                sparRes_1(spar);
                                                sparRes_1 = null;
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }).catch(encodeErr);
                            },
                            error: encodeErr
                        });
                        enc.configure(config);
                        return [2 /*return*/, [
                                sparP,
                                enc
                            ]];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * @private
     * Try to get a AudioEncoder instance for this stream.
     */
    function tryAudioEncoder(la, configAny, streamIndex, inStream, encodeQueue, encodeErr) {
        return __awaiter(this, void 0, void 0, function () {
            var p_2, config, stream_2, sparRes_2, sparP, enc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!configAny || !configAny.codec)
                            return [2 /*return*/, null];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        p_2 = Promise.all([]);
                        config = configAny;
                        if (!config.sampleRate)
                            config.sampleRate = inStream.sample_rate;
                        if (!config.numberOfChannels)
                            config.numberOfChannels = inStream.channels;
                        return [4 /*yield*/, configToAudioStream(la, config)];
                    case 2:
                        stream_2 = _a.sent();
                        sparRes_2 = null;
                        sparP = new Promise(function (res) { return sparRes_2 = res; });
                        enc = new AudioEncoder({
                            output: function (chunk, metadata) {
                                // FIXME: Force waiting for the final promise
                                p_2 = p_2.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var pkt, spar;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, encodedAudioChunkToPacket(la, chunk, metadata, stream_2, streamIndex)];
                                            case 1:
                                                pkt = _a.sent();
                                                encodeQueue.push(pkt);
                                                if (!sparRes_2) return [3 /*break*/, 3];
                                                return [4 /*yield*/, la.ff_copyout_codecpar(stream_2[0])];
                                            case 2:
                                                spar = _a.sent();
                                                spar.time_base_num = 1;
                                                spar.time_base_den = 1000000;
                                                sparRes_2(spar);
                                                sparRes_2 = null;
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }).catch(encodeErr);
                            },
                            error: encodeErr
                        });
                        enc.configure(config);
                        return [2 /*return*/, [
                                sparP,
                                enc
                            ]];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * @private
     * Convert these frames to all be in libav format.
     */
    function libavifyFrames(la, frames) {
        return __awaiter(this, void 0, void 0, function () {
            var i, frame, vf, _a, _b, af, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(i < frames.length)) return [3 /*break*/, 6];
                        frame = frames[i];
                        if (!frame.codedWidth) return [3 /*break*/, 3];
                        vf = frame;
                        _a = frames;
                        _b = i;
                        return [4 /*yield*/, videoFrameToLAFrame(vf)];
                    case 2:
                        _a[_b] = _e.sent();
                        vf.close();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!frame.numberOfFrames) return [3 /*break*/, 5];
                        af = frame;
                        _c = frames;
                        _d = i;
                        return [4 /*yield*/, audioDataToLAFrame(af)];
                    case 4:
                        _c[_d] = _e.sent();
                        af.close();
                        _e.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * @private
     * Convert these frames to all be in WebCodecs format.
     */
    function webcodecsifyFrames(la, frames) {
        return __awaiter(this, void 0, void 0, function () {
            var i, frame, laFrame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < frames.length)) return [3 /*break*/, 5];
                        frame = frames[i];
                        if (!(typeof frame === "number")) return [3 /*break*/, 3];
                        return [4 /*yield*/, la.ff_copyout_frame(frame)];
                    case 2:
                        frame = _a.sent();
                        _a.label = 3;
                    case 3:
                        laFrame = frame;
                        if (laFrame.data) {
                            if (laFrame.width)
                                frames[i] = laFrameToVideoFrame(laFrame);
                            else
                                frames[i] = laFrameToAudioData(laFrame);
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * @private
     * Make a filter appropriate to handle this data.
     */
    function mkFilter(la, c, stream, frameIn) {
        return __awaiter(this, void 0, void 0, function () {
            var frame, _a, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(typeof frameIn === "number")) return [3 /*break*/, 2];
                        return [4 /*yield*/, la.ff_copyout_frame(frameIn)];
                    case 1:
                        frame = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        frame = frameIn;
                        _e.label = 3;
                    case 3:
                        if (!(stream.codec_type === la.AVMEDIA_TYPE_VIDEO)) return [3 /*break*/, 5];
                        return [4 /*yield*/, la.ff_init_filter_graph("null", {
                                type: la.AVMEDIA_TYPE_VIDEO,
                                width: frame.width,
                                height: frame.height,
                                pix_fmt: frame.format,
                                time_base: frame.time_base_num
                                    ? [frame.time_base_num, frame.time_base_den]
                                    : void 0
                            }, {
                                type: la.AVMEDIA_TYPE_VIDEO,
                                width: stream.width,
                                height: stream.height,
                                pix_fmt: stream.format,
                                time_base: [1, 1000000]
                            })];
                    case 4: return [2 /*return*/, _e.sent()];
                    case 5:
                        _b = (_a = la).ff_init_filter_graph;
                        _c = ["aresample",
                            {
                                sample_rate: frame.sample_rate,
                                channel_layout: frame.channel_layout,
                                sample_fmt: frame.format,
                                time_base: frame.time_base_num
                                    ? [frame.time_base_num, frame.time_base_den]
                                    : void 0
                            }];
                        _d = {
                            sample_rate: stream.sample_rate,
                            channel_layout: stream.channel_layoutmask,
                            sample_fmt: stream.format,
                            time_base: [1, stream.sample_rate]
                        };
                        return [4 /*yield*/, la.AVCodecContext_frame_size(c)];
                    case 6: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.frame_size = _e.sent(),
                                _d)]))];
                    case 7: return [2 /*return*/, _e.sent()];
                }
            });
        });
    }

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * A global counter for unique filenames.
     */
    var fnCounter = 0;
    /**
     * A generic muxer.
     */
    var Muxer = /** @class */ (function () {
        function Muxer(randomAccess, 
        /**
         * @private
         * LibAV instance.
         */
        _libav, 
        /**
         * @private
         * Input packet stream.
         */
        _inputP, 
        /**
         * @private
         * Output format to write.
         */
        _format) {
            this.randomAccess = randomAccess;
            this._libav = _libav;
            this._inputP = _inputP;
            this._format = _format;
            this.component = "muxer";
            this.streamType = "file";
            this.stream = new ReadableStream({});
        }
        /**
         * @private
         * Muxers must be initialized.
         */
        Muxer.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var la, input, streams, rdr, tavOutputs_1, filename, outBuf, eof, muxStreams, _i, streams_1, stream, codecpar, _a, fmtCtx, pb, pkt;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            la = this._libav;
                            return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _b.sent();
                            return [4 /*yield*/, input.streams];
                        case 2:
                            streams = _b.sent();
                            rdr = input.stream.getReader();
                            if (!la.tavOutputs) {
                                tavOutputs_1 = la.tavOutputs = Object.create(null);
                                la.onwrite =
                                    function (name, position, buffer) {
                                        var f = tavOutputs_1[name];
                                        if (!f)
                                            return;
                                        f(position, new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength));
                                    };
                            }
                            filename = (fnCounter++) + ".out";
                            if (!this.randomAccess) return [3 /*break*/, 4];
                            return [4 /*yield*/, la.mkwriterdev(filename)];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, la.mkstreamwriterdev(filename)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            outBuf = [];
                            la.tavOutputs[filename] = function (position, data) {
                                outBuf.push([position, data.byteOffset ? data.slice(0) : data]);
                            };
                            eof = false;
                            muxStreams = [];
                            _i = 0, streams_1 = streams;
                            _b.label = 7;
                        case 7:
                            if (!(_i < streams_1.length)) return [3 /*break*/, 11];
                            stream = streams_1[_i];
                            return [4 /*yield*/, la.avcodec_parameters_alloc()];
                        case 8:
                            codecpar = _b.sent();
                            return [4 /*yield*/, la.ff_copyin_codecpar(codecpar, stream)];
                        case 9:
                            _b.sent();
                            muxStreams.push([codecpar, stream.time_base_num, stream.time_base_den]);
                            _b.label = 10;
                        case 10:
                            _i++;
                            return [3 /*break*/, 7];
                        case 11: return [4 /*yield*/, la.ff_init_muxer({
                                oformat: (typeof this._format === "number")
                                    ? this._format : void 0,
                                format_name: (typeof this._format === "string")
                                    ? this._format : void 0,
                                filename: filename,
                                open: true,
                                codecpars: true
                            }, muxStreams)];
                        case 12:
                            _a = _b.sent(), fmtCtx = _a[0], pb = _a[2], _a[3];
                            return [4 /*yield*/, la.avformat_write_header(fmtCtx, 0)];
                        case 13:
                            _b.sent();
                            return [4 /*yield*/, la.av_packet_alloc()];
                        case 14:
                            pkt = _b.sent();
                            // Create the data stream
                            this.stream = new ReadableStream({
                                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                                    var buf, packets;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (outBuf.length) {
                                                    while (outBuf.length) {
                                                        buf = outBuf.shift();
                                                        controller.enqueue({
                                                            position: buf[0],
                                                            data: buf[1]
                                                        });
                                                    }
                                                    return [3 /*break*/, 7];
                                                }
                                                if (eof) {
                                                    controller.close();
                                                    return [3 /*break*/, 7];
                                                }
                                                return [4 /*yield*/, rdr.read()];
                                            case 1:
                                                packets = _a.sent();
                                                if (!packets.done) return [3 /*break*/, 5];
                                                eof = true;
                                                return [4 /*yield*/, la.av_write_trailer(fmtCtx)];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, la.ff_free_muxer(fmtCtx, pb)];
                                            case 3:
                                                _a.sent();
                                                return [4 /*yield*/, la.av_packet_free_js(pkt)];
                                            case 4:
                                                _a.sent();
                                                return [3 /*break*/, 0];
                                            case 5: return [4 /*yield*/, la.ff_write_multi(fmtCtx, pkt, packets.value)];
                                            case 6:
                                                _a.sent();
                                                return [3 /*break*/, 0];
                                            case 7: return [2 /*return*/];
                                        }
                                    });
                                }); }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Muxer.prototype.sendCommands = function (cmds) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._inputP];
                        case 1:
                            input = _a.sent();
                            return [2 /*return*/, input.sendCommands(cmds)];
                    }
                });
            });
        };
        /**
         * Build a muxer.
         */
        Muxer.build = function (libav, init, input) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new Muxer(!!init.randomAccess, libav, input, init.format);
                            return [4 /*yield*/, ret._init()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        return Muxer;
    }());

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    // declare let AudioDecoder: typeof wcp.AudioDecoder;
    /**
     * A stream of frames coming from the user.
     */
    var UserFrameStream = /** @class */ (function () {
        function UserFrameStream(la, init) {
            var _this = this;
            this.component = "frame-stream";
            this.ptr = false;
            this.streamType = "frame";
            var streams = [];
            var streamRes = [];
            for (var _i = 0, _a = init.streams; _i < _a.length; _i++) {
                _a[_i];
                streams.push(new Promise(function (res) { return streamRes.push(res); }));
            }
            this.streams = Promise.all(streams);
            var rdr = init.input.getReader();
            this.stream = new ReadableStream({
                pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                    var rd, _i, _a, frame, res, spar, laf;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, rdr.read()];
                            case 1:
                                rd = _b.sent();
                                if (rd.done) {
                                    controller.close();
                                    return [2 /*return*/];
                                }
                                _i = 0, _a = rd.value;
                                _b.label = 2;
                            case 2:
                                if (!(_i < _a.length)) return [3 /*break*/, 11];
                                frame = _a[_i];
                                res = streamRes[frame.streamIndex];
                                if (!res)
                                    return [3 /*break*/, 10];
                                spar = void 0;
                                laf = void 0;
                                if (!frame.frame.codedWidth) return [3 /*break*/, 4];
                                return [4 /*yield*/, videoFrameToLAFrame(frame.frame)];
                            case 3:
                                laf = _b.sent();
                                return [3 /*break*/, 9];
                            case 4:
                                if (!frame.frame.numberOfFrames) return [3 /*break*/, 6];
                                return [4 /*yield*/, audioDataToLAFrame(frame.frame)];
                            case 5:
                                laf = _b.sent();
                                return [3 /*break*/, 9];
                            case 6:
                                if (!(typeof frame.frame === "number")) return [3 /*break*/, 8];
                                return [4 /*yield*/, la.ff_copyout_frame(frame.frame)];
                            case 7:
                                laf = _b.sent();
                                return [3 /*break*/, 9];
                            case 8:
                                laf = frame.frame;
                                _b.label = 9;
                            case 9:
                                spar = {
                                    codec_id: 0,
                                    codec_type: laf.width ? la.AVMEDIA_TYPE_VIDEO : la.AVMEDIA_TYPE_AUDIO,
                                    format: laf.format,
                                    width: laf.width,
                                    height: laf.height,
                                    sample_rate: laf.sample_rate,
                                    channel_layoutmask: laf.channel_layout,
                                    channels: laf.channels,
                                    time_base_num: laf.time_base_num || 1,
                                    time_base_den: laf.time_base_den || 1000000
                                };
                                Object.assign(spar, init.streams[frame.streamIndex]);
                                res(spar);
                                streamRes[frame.streamIndex] = null;
                                _b.label = 10;
                            case 10:
                                _i++;
                                return [3 /*break*/, 2];
                            case 11:
                                controller.enqueue(rd.value);
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        UserFrameStream.prototype.sendCommands = function (cmds) {
            return Promise.resolve(addResults(cmds));
        };
        return UserFrameStream;
    }());

    /*
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    /**
     * Create a transavormer for the requested task.
     * @param init  Task description (initializer).
     */
    function build$1(libav, init) {
        switch (init.type) {
            case "demuxer":
                return buildDemuxer(libav, init, !!init.ptr);
            case "packet-selector":
                return buildPacketSelector(libav, init);
            case "decoder":
                return buildDecoder(libav, init, !!init.ptr);
            case "frame-selector":
                return buildFrameSelector(libav, init);
            case "frame-normalizer":
                return buildNormalizer(libav, init, !!init.ptr);
            case "play-normalizer":
                return buildPlayNormalizer(libav, init);
            case "la-filter":
                return buildLAFilter(libav, init, !!init.ptr);
            case "encoder":
                return buildEncoder(libav, init, !!init.ptr);
            case "muxer":
                return buildMuxer(libav, init);
            case "packet-stream":
                return buildUserPacketStream(init);
            case "frame-stream":
                return buildUserFrameStream(libav, init);
            case "mono-frame-stream":
                return buildUserMonoFrameStream(libav, init);
        }
        throw new Error("Unrecognized initializer type ".concat(init.type));
    }
    function buildDemuxer(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.streamType === "packet")
            return Promise.resolve(init);
        if (init.type !== "demuxer") {
            return buildDemuxer(libav, {
                type: "demuxer",
                input: init
            }, ptr);
        }
        init.ptr = ptr;
        return Demuxer.build(libav, init);
    }
    function buildPacketSelector(libav, init) {
        if (init.then)
            return init;
        if (init.streamType === "packet")
            return Promise.resolve(init);
        return PacketSelector.build(libav, init, buildPacketStream(libav, init.input, true));
    }
    function buildDecoder(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.streamType === "frame" ||
            init.streamType === "libav-frame" ||
            init.streamType === "webcodecs-frame")
            return Promise.resolve(init);
        if (init.type !== "decoder") {
            return buildDecoder(libav, {
                type: "decoder",
                input: init
            }, ptr);
        }
        init.ptr = ptr;
        return Decoder.build(libav, init, buildPacketStream(libav, init.input, true));
    }
    function buildFrameSelector(libav, init) {
        if (init.then)
            return init;
        if (init.streamType === "packet")
            return Promise.resolve(init);
        return FrameSelector.build(libav, init, buildFrameStream(libav, init.input, true));
    }
    function buildNormalizer(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.streamType === "libav-frame")
            return Promise.resolve(init);
        if (init.type !== "frame-normalizer") {
            return buildNormalizer(libav, {
                type: "frame-normalizer",
                input: init
            }, ptr);
        }
        init.ptr = ptr;
        return FrameNormalizer.build(libav, init, buildDecoder(libav, init.input, true));
    }
    function buildPlayNormalizer(libav, init) {
        if (init.then)
            return init;
        if (init.streamType === "frame")
            return Promise.resolve(init);
        return PlaybackNormalizer.build(libav, init, buildDecoder(libav, init.input, true));
    }
    function buildLAFilter(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.type !== "la-filter") {
            return buildLAFilter(libav, {
                type: "la-filter",
                input: init
            }, ptr);
        }
        init.ptr = ptr;
        return LAFilter.build(libav, init, buildFrameStream(libav, init.input, true));
    }
    function buildFrameStream(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.streamType === "frame" ||
            init.streamType === "libav-frame" ||
            init.streamType === "webcodecs-frame")
            return Promise.resolve(init);
        if (init.type === "la-filter") {
            return buildLAFilter(libav, init, ptr);
        }
        else if (init.type === "frame-normalizer") {
            return buildNormalizer(libav, init, ptr);
        }
        else if (init.type === "frame-stream") {
            return buildUserFrameStream(libav, init);
        }
        else if (init.type === "mono-frame-stream") {
            return buildUserMonoFrameStream(libav, init);
        }
        else {
            return buildDecoder(libav, init, ptr);
        }
    }
    function buildEncoder(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.streamType === "packet")
            return Promise.resolve(init);
        if (init.type !== "encoder") {
            return buildEncoder(libav, {
                type: "encoder",
                videoConfig: {
                    codec: "vp09.00.10.08.03.1.1.1.0",
                    width: 0,
                    height: 0
                },
                audioConfig: {
                    codec: "opus"
                },
                input: init
            }, ptr);
        }
        init.ptr = ptr;
        return Encoder.build(libav, init, buildFrameStream(libav, init.input, true));
    }
    function buildPacketStream(libav, init, ptr) {
        if (init.then)
            return init;
        if (init.streamType === "packet")
            return Promise.resolve(init);
        if (init.type === "filter" ||
            init.type === "frame-normalizer" ||
            init.type === "encoder") {
            return buildEncoder(libav, init, ptr);
        }
        else if (init.type === "packet-stream") {
            return buildUserPacketStream(init);
        }
        else {
            return buildDemuxer(libav, init, ptr);
        }
    }
    function buildMuxer(libav, init) {
        if (init.then)
            return init;
        if (init.streamType === "file")
            return Promise.resolve(init);
        if (init.type !== "muxer") {
            init.ptr = true;
            return buildMuxer(libav, {
                type: "muxer",
                format: "matroska",
                input: init
            });
        }
        return Muxer.build(libav, init, buildPacketStream(libav, init.input, true));
    }
    function buildUserPacketStream(init) {
        return Promise.resolve({
            component: "packet-stream",
            ptr: false,
            streams: Promise.resolve(init.streams),
            streamType: "packet",
            stream: init.input,
            sendCommands: function (cmds) {
                return Promise.resolve(addResults(cmds));
            }
        });
    }
    function buildUserFrameStream(libav, init) {
        return Promise.resolve(new UserFrameStream(libav, init));
    }
    function buildUserMonoFrameStream(libav, init) {
        var _this = this;
        var rdr = init.input.getReader();
        var rs = new ReadableStream({
            pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                var rd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, rdr.read()];
                        case 1:
                            rd = _a.sent();
                            if (rd.done) {
                                controller.close();
                            }
                            else {
                                controller.enqueue(rd.value.map(function (x) { return ({
                                    streamIndex: 0,
                                    frame: x
                                }); }));
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        return buildUserFrameStream(libav, {
            type: "frame-stream",
            streams: [init.stream],
            input: rs
        });
    }

    /*!
     * Copyright (c) 2024 Yahweasel
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
     * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
     * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
     * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     */
    var build = build$1;

    exports.build = build;

}));
//# sourceMappingURL=transavormer.js.map
