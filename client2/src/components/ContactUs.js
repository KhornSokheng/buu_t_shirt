import React from 'react'

export default function ContactUs() {
  return (
    <div>
      <meta name="viewport" content="" />
      <h3>Contact Us</h3>
      <div className="container border border-primary rounded mb-3">
        <form action="">
        <div className="container">
          <label htmlFor="Your name">Your name</label>
          <input type="text" id="fname" name="Your name" placeholder="Your name.." />
          </div>
          <div className="container">
          <label htmlFor="Email">Email</label>
          <input type="text" id="Email" name="Email" placeholder="Your email.." />
          </div>
          <div className="container">
          <label htmlFor="subject">Message</label>
          <textarea id="subject" name="subject" placeholder="Write something.." defaultValue={""} />
          </div>
          <div className="container">
          <input type="submit" defaultValue="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
