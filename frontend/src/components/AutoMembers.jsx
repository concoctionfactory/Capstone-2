/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMembersApi } from "../actions/users";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FixedTags({ board, addMembers }) {
  const user = useSelector((state) => state.users);
  const allMembers = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(
    function loadMembersWhenChanges() {
      async function getMembers() {
        dispatch(getMembersApi());
      }
      if (Object.keys(allMembers).length === 0) {
        getMembers();
      }
    },
    [dispatch, allMembers]
  );

  let fixedOptions = [];
  let currMembersOptions = [];

  if (board && Object.keys(allMembers).length > 0) {
    let currAdminUsernames = board.members.reduce((acc, curr) => {
      if (curr.is_admin) return [...acc, curr.username];
      return acc;
    }, []);

    let currMemberUsernames = board.members.reduce((acc, curr) => {
      if (!curr.is_admin) return [...acc, curr.username];
      return acc;
    }, []);

    let allMembersUsernames = allMembers.map((am) => am.username);

    let currAdmin = currAdminUsernames.map((m) => {
      let idx = allMembersUsernames.indexOf(m);
      return allMembers[idx];
    });
    let currMemebers = currMemberUsernames.map((m) => {
      let idx = allMembersUsernames.indexOf(m);
      return allMembers[idx];
    });
    fixedOptions = currAdmin;
    currMembersOptions = currMemebers;
  }

  if (!board && Object.keys(allMembers).length > 0) {
    let allMembersUsernames = allMembers.map((am) => am.username);
    let idx = allMembersUsernames.indexOf(user.username);
    let currAdmin = allMembers[idx];
    fixedOptions = [currAdmin];
  }

  const [value, setValue] = React.useState([]);
  useEffect(
    function reloadFormData() {
      if (Object.keys(allMembers).length > 0) {
        setValue([...fixedOptions, ...currMembersOptions]);
      }
    },
    [allMembers]
  );

  const handleOnChange = (event, newValue) => {
    addMembers(newValue.map((m) => m.username));
    setValue([
      ...fixedOptions,
      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    ]);
  };

  return (
    <div>
      {Object.keys(allMembers).length > 0 && (
        <Autocomplete
          multiple
          id="members"
          value={value}
          onChange={handleOnChange}
          options={allMembers}
          getOptionLabel={(option) => option.username}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option.username}
                {...getTagProps({ index })}
                disabled={fixedOptions.indexOf(option) !== -1}
              />
            ))
          }
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="members"
              variant="outlined"
              placeholder="members"
            />
          )}
        />
      )}
    </div>
  );
}
