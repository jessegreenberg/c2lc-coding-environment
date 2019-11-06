// @flow

import ProgramBlockEditor from './ProgramBlockEditor';
import ProgramTextEditor from './ProgramTextEditor';
import React from 'react';
import TextSyntax from './TextSyntax';
import { Container } from 'react-bootstrap';
import type {EditorMode, Program} from './types';

type EditorContainerProps = {
    program: Program,
    programVer: number,
    syntax: TextSyntax,
    mode: EditorMode,
    selectedCommand: string,
    onChange: (Program) => void
};

export default class EditorContainer extends React.Component<EditorContainerProps, {}> {

    constructor(props: EditorContainerProps) {
        super(props);
    }

    render() {
        return (
            <Container>
                {this.props.mode === 'text' ? (
                    <ProgramTextEditor
                        program={this.props.program}
                        programVer={this.props.programVer}
                        syntax={this.props.syntax}
                        onChange={this.props.onChange} />
                 ) : (
                     //ProgramBlockEditor doesn't have TextSyntax
                    <ProgramBlockEditor
                        program={this.props.program}
                        selectedCommand={this.props.selectedCommand}
                        onChange={this.props.onChange} />
                )}
            </Container>
        );
    }
}
