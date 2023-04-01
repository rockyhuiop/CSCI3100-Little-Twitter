import defaultUser from "../assets/default.jpg";
import { auto_grow } from "../script/auto_grow";
import { toggle_div } from "../script/toggle_div";
import {file_path} from "../script/file_path"
import React, { useEffect } from 'react'

const Add_tw = () => {
    useEffect(()=>{
        file_path();
        }, [])
    return (
        <>
            <div className="hp-addtw">
                <div className="center hp-popup-click">
                    <div className="hp-addtw-box">
                        <div className="row" style={{ height: 24 }}>
                            <button
                                onClick={() => toggle_div(0, "hp-addtw")}
                                className="hp-popup-close"
                            >
                                <ion-icon name="close-outline" />
                            </button>
                            <div id="hp-addtw-title">Add a Tweet</div>
                        </div>
                        <form id="hp-addtw" name="hp-addtw">
                            <div className="row">
                                <img
                                    id="hp-addtw-icon"
                                    className="user-icon"
                                    src={defaultUser}
                                    alt="Avatar of user"
                                />
                                <textarea
                                    onInput={() => auto_grow("hp-addtw-con")}
                                    placeholder="What's happening?"
                                    id="hp-addtw-con"
                                    name="hp-addtw-con"
                                    defaultValue={""}
                                    autoFocus
                                />
                            </div>
                            <div className="row">
                                <input
                                    id="hp-addtw-file"
                                    name="hp-addtw-file"
                                    type="file"
                                />
                                <label
                                    className="label-upload"
                                    id="hp-addtw-file-label"
                                    htmlFor="hp-addtw-file"
                                >
                                    <ion-icon name="image-outline" />
                                </label>
                                <span id="hp-addtw-file-des">
                                    No media has been chosen
                                </span>
                                <button
                                    id="hp-addtw-sub"
                                    type="submit"
                                    value="Submit"
                                >
                                    Add tweet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Add_tw;
