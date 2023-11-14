export default function JobPosting({ url, title, by, time }) {
    return (
      <div className="jobPosting">
        <h2>
          {url ? (
            <a href={url} target="_blank">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <div>
          By {by} &middot;
          {new Date(time * 1000).toLocaleString()}
        </div>
      </div>
    );
  }
  