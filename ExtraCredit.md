# Potential Improvements

- A nice design for the error messages related to the form
- Some buttons for more control over the app, removing the event, adding multiple events, making it
  clearer when an event gets added (a "submit" button, a "reset" button)
- Could add some loading state, fx. a spinner while calculating the countdown
- Currently there is a known issue that if you want to update the title of the event but keep the
  same date, you can't. The view only updates if the date changes.
- If the app were to grow, it would be good to manage the event data better than just using local
  storage, like using a state management setup.
- The date picker could be made a lot more accessible.

Normally I would have asked design / UX a lot of questions, asked about intended behaviour and
requirements, and worked with them to find a nice solution. Because I don't have a team i made some
big assumptions and added my own solutions where I thought they were needed (such as the date picker
submitting the event, the intro text to explain what to do)
