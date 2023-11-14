import JobPosting from "./JobPosting";
import "./styles.css";
import react, { useEffect, useState } from "react";

const PAGE_SIZE = 6;

export default function App() {
  const [jobIds, setJobIds] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [fetchingJobData, setFetchingJobData] = useState(false);

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  async function fetchJobIds(currPage) {
    let initialJobIds = jobIds;
    if (!initialJobIds) {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      initialJobIds = await res.json();
      setJobIds(initialJobIds);
    }
    // current page has got some jobs
    // so fetch next job ids
    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return initialJobIds.slice(start, end);
  }

  async function fetchJobs(currPage) {
    const jobIdsForPage = await fetchJobIds(currPage);
    // fetchJobIds
    setFetchingJobData(true);
    const jobsForCurrPage = await Promise.all(
      jobIdsForPage.map((id) =>
        //fetchJobDetails
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        ).then((res) => res.json())
      )
    );
    if (currPage === 0) setJobs([...jobsForCurrPage]);
    else setJobs([...jobs, ...jobsForCurrPage]);
    setFetchingJobData(false);
  }

  return (
    <div>
      <h1 className="title">Hacker News Jobs Board</h1>
      {jobs.length > 0 && (
        <div className="jobList">
          {jobs.map((job) => {
            return <JobPosting key={job.id} {...job} />;
          })}
          {jobIds.length && page * PAGE_SIZE + PAGE_SIZE < jobIds.length && (
            <button
              className="loadMoreJobs"
              disabled={fetchingJobData}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {fetchingJobData ? "Loading..." : "Load more jobs"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
