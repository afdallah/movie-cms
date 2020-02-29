import React from 'react'

export const renderJSON = (object) => {
  return (
    <pre>
      <code>
        {JSON.stringify(object, null, 2)}
      </code>
    </pre>
  )
}
