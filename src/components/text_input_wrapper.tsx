import { get } from 'lodash'
import React, {FC} from 'react'

import {StoreContext} from './store'
import TextInput from './text_input'
import {pathToId} from '../utilities/paths_utils'

interface TextInputWrapperProps {
  label: string,
  path: string,
}

/**
 * A component that wraps a TextInput component in order to tie it to the data store
 * 
 * @param label The label of the TextInput component
 * @param path The path (consistent with the path provided to the lodash
 * get() method) to the datum within the data store for the TextInput component
 */
const TextInputWrapper: FC<TextInputWrapperProps> = ({label, path}) => {

  // Generate an id for the input
  const id = pathToId("input", path)

  return (
    <StoreContext.Consumer>
      {({doc, upsertData}) => {
          return (
            <TextInput id={id} label={label} 
              updateValue= {(value: any) => upsertData(path, value)}
              value = {get(doc, path)}/>
          )
        }
      }
    </StoreContext.Consumer>

)}


export default TextInputWrapper
